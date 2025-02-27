import mongoose from 'mongoose'

import { logger } from '@/client'
import { IUser, User } from '@/model/user'
import { IWallet, Wallet } from '@/model/wallet'
import { WalletAccessor } from '@/model/wallet-accessor'
import { IWalletBalance, WalletBalance } from '@/model/wallet-balance'
import { IWalletType, WalletType } from '@/model/wallet-type'

import { sampleNormalUsers } from './constants'

// Define wallet types
const walletTypes: Partial<IWalletType>[] = [
  {
    label: 'primary',
    multipleBalance: false,
    hasPlatform: true,
    status: 'active',
  },
  {
    label: 'savings',
    multipleBalance: true,
    hasPlatform: true,
    status: 'active',
  },
  {
    label: 'business',
    multipleBalance: true,
    hasPlatform: true,
    status: 'active',
  },
  {
    label: 'escrow',
    multipleBalance: false,
    hasPlatform: true,
    status: 'active',
  },
]

// Define balance ranges for different wallet types
const balanceRanges: Record<string, { min: number; max: number }> = {
  primary: { min: 500, max: 10000 },
  savings: { min: 1000, max: 50000 },
  business: { min: 5000, max: 100000 },
  escrow: { min: 100, max: 2000 },
}

// Default currencies to use for balances
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY']

// Generate a random amount within a range
function getRandomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Get a random item from an array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Generate a random date within the last year
function getRandomDate(): Date {
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setFullYear(now.getFullYear() - 1)

  return new Date(
    oneYearAgo.getTime() +
      Math.random() * (now.getTime() - oneYearAgo.getTime()),
  )
}

// Seed wallet types
async function seedWalletTypes(
  adminId: mongoose.Types.ObjectId,
): Promise<IWalletType[]> {
  logger.info('Seeding wallet types...')
  const createdWalletTypes: IWalletType[] = []

  for (const walletTypeData of walletTypes) {
    const existingWalletType = await WalletType.findOne({
      label: walletTypeData.label,
    })

    if (existingWalletType) {
      logger.info(`Wallet type "${walletTypeData.label}" already exists.`)
      createdWalletTypes.push(existingWalletType)
      continue
    }

    const walletType = await WalletType.create({
      ...walletTypeData,
      createdBy: adminId,
    })

    logger.info(`Created wallet type: ${walletType.label}`)
    createdWalletTypes.push(walletType)
  }

  return createdWalletTypes
}

// Seed wallets for users
async function seedWallets(
  users: IUser[],
  walletTypes: IWalletType[],
): Promise<IWallet[]> {
  logger.info('Seeding wallets...')
  const wallets: IWallet[] = []

  for (const user of users) {
    // Each user gets 1-3 wallets of different types
    const numWallets = Math.floor(Math.random() * 3) + 1
    const userWalletTypes = [...walletTypes]
      .sort(() => 0.5 - Math.random())
      .slice(0, numWallets)

    for (const walletType of userWalletTypes) {
      const title = `${user.firstName}'s ${walletType.label} wallet`

      const existingWallet = await Wallet.findOne({
        owner: user.id,
        walletType: walletType.id,
      })

      if (existingWallet) {
        logger.info(
          `Wallet "${title}" already exists for ${user.firstName} ${user.lastName}.`,
        )
        wallets.push(existingWallet)
        continue
      }

      const wallet = await Wallet.create({
        title,
        description: `${walletType.label} for ${user.firstName}`,
        owner: user.id,
        walletType: walletType.id,
        status: 'active',
        createdBy: user.id,
        createdAt: getRandomDate(),
      })

      logger.info(
        `Created wallet "${title}" for ${user.firstName} ${user.lastName}`,
      )
      wallets.push(wallet)
    }
  }

  return wallets
}

// Seed wallet accessors for users
async function seedWalletAccessors(
  wallets: IWallet[],
  users: IUser[],
): Promise<void> {
  logger.info('Seeding wallet accessors...')

  // Filter out users who will be accessors (not owners)
  const accessorUsers = sampleNormalUsers

  for (const wallet of wallets) {
    // Skip some wallets randomly to avoid all wallets having accessors
    if (Math.random() > 0.7) continue

    // Get owner from wallet
    const ownerUser = users.find(user => user.id === wallet.owner.toString())
    if (!ownerUser) {
      logger.info(`Owner not found for wallet ${wallet.title}, skipping...`)
      continue
    }

    // Generate random accessors
    const accessorCount =
      Math.floor(Math.random() * (sampleNormalUsers.length - 2)) + 1

    // Get potential accessors (excluding the owner)
    const potentialAccessors = accessorUsers.filter(
      user => user.id !== wallet.owner.toString(),
    )

    // Randomly select accessors
    for (
      let i = 0;
      i < Math.min(accessorCount, potentialAccessors.length);
      i++
    ) {
      // Randomly select an accessor
      const randomIndex = Math.floor(Math.random() * potentialAccessors.length)
      const accessor = potentialAccessors[randomIndex]

      // Remove selected accessor to avoid duplicates
      potentialAccessors.splice(randomIndex, 1)

      // Check if accessor already exists
      const existingAccessor = await WalletAccessor.findOne({
        wallet: wallet.id,
        accessor: accessor.id,
      })

      if (existingAccessor) {
        logger.info(
          `Accessor ${accessor.email} already exists for wallet ${wallet.title}, skipping...`,
        )
        continue
      }

      // Create accessor
      await WalletAccessor.create({
        wallet: wallet.id,
        accessor: accessor.id,
        status: 'active',
        createdBy: wallet.owner,
        createdAt: new Date(),
      })

      logger.info(
        `Created accessor ${accessor.email} for wallet ${wallet.title}`,
      )
    }
  }

  logger.info('Finished seeding wallet accessors')
}

// Seed wallet balances
async function seedWalletBalances(
  wallets: IWallet[],
  adminId: mongoose.Types.ObjectId,
): Promise<void> {
  logger.info('Seeding wallet balances...')

  for (const wallet of wallets) {
    // Get the wallet type
    const walletTypeDoc = await WalletType.findById(wallet.walletType)
    if (!walletTypeDoc) {
      logger.info(
        `Wallet type not found for wallet ${wallet.title}, skipping...`,
      )
      continue
    }

    const walletType = walletTypeDoc.label

    // Check if balance already exists
    const existingBalance = await WalletBalance.findOne({
      wallet: new mongoose.Types.ObjectId(wallet.id),
    })

    const range = balanceRanges[walletType] || balanceRanges.primary
    const amount = getRandomAmount(range.min, range.max)
    const currency = getRandomItem(CURRENCIES)

    if (existingBalance) {
      logger.info(
        `Balance already exists for wallet ${wallet.title}, updating...`,
      )

      await WalletBalance.findByIdAndUpdate(existingBalance.id, {
        amount,
        currency,
        updatedBy: adminId,
        updatedAt: new Date(),
      })

      logger.info(
        `Updated balance for "${wallet.title}" to ${amount} ${currency}`,
      )
      continue
    }

    // Create new balance
    const balanceData: Partial<IWalletBalance> = {
      wallet: new mongoose.Types.ObjectId(wallet.id),
      amount,
      currency,
      status: 'active',
      createdBy: adminId,
      createdAt: getRandomDate(),
    }

    await WalletBalance.create(balanceData)
    logger.info(
      `Created balance of ${amount} ${currency} for wallet "${wallet.title}"`,
    )
  }
}

// Main seed function
async function feed() {
  try {
    // Create admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@example.com' })

    if (!adminUser) {
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'AdminPass123!',
        status: 'active',
      })

      if (!adminUser) {
        throw new Error('Failed to create admin user')
      }

      logger.info('Admin user created')
    } else {
      logger.info('Admin user already exists')
    }

    // Create test users
    const users: IUser[] = [adminUser]

    for (const userData of sampleNormalUsers) {
      const existingUser = await User.findOne({ email: userData.email })

      if (existingUser) {
        logger.info(`User ${userData.email} already exists.`)
        users.push(existingUser)
        continue
      }

      const user = await User.create(userData)
      logger.info(`Created user: ${user.firstName} ${user.lastName}`)
      users.push(user)
    }

    // Seed wallet types
    const walletTypeDocs = await seedWalletTypes(adminUser.id)

    // Seed wallets
    const wallets = await seedWallets(users, walletTypeDocs)

    // Seed wallet accessors
    await seedWalletAccessors(wallets, users)

    // Seed wallet balances
    await seedWalletBalances(wallets, adminUser.id)

    logger.info('Wallet seeding completed successfully.')
  } catch (error) {
    logger.error('Error in wallet seed:', error)
    throw error
  }
}

export async function walletFeed() {
  try {
    await feed()
    logger.info('Wallet seed process completed.')
  } catch (error) {
    logger.error('Wallet seed process failed:', error)
    throw error
  }
}
