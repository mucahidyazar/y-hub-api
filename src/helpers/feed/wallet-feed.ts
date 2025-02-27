/* eslint-disable no-console */
import mongoose from 'mongoose'

import { IUser, User } from '@/model/user'
import { IWallet, Wallet } from '@/model/wallet'
import { IWalletBalance, WalletBalance } from '@/model/wallet-balance'
import { IWalletType, WalletType } from '@/model/wallet-type'

// Define test users
const testUsers: Partial<IUser>[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    password: 'Password123!',
    status: 'active',
  },
]

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
  console.log('Seeding wallet types...')
  const createdWalletTypes: IWalletType[] = []

  for (const walletTypeData of walletTypes) {
    const existingWalletType = await WalletType.findOne({
      label: walletTypeData.label,
    })

    if (existingWalletType) {
      console.log(`Wallet type "${walletTypeData.label}" already exists.`)
      createdWalletTypes.push(existingWalletType)
      continue
    }

    const walletType = await WalletType.create({
      ...walletTypeData,
      createdBy: adminId,
    })

    console.log(`Created wallet type: ${walletType.label}`)
    createdWalletTypes.push(walletType)
  }

  return createdWalletTypes
}

// Seed wallets for users
async function seedWallets(
  users: IUser[],
  walletTypes: IWalletType[],
): Promise<IWallet[]> {
  console.log('Seeding wallets...')
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
        console.log(
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

      console.log(
        `Created wallet "${title}" for ${user.firstName} ${user.lastName}`,
      )
      wallets.push(wallet)
    }
  }

  return wallets
}

// Seed wallet balances
async function seedWalletBalances(
  wallets: IWallet[],
  adminId: mongoose.Types.ObjectId,
): Promise<void> {
  console.log('Seeding wallet balances...')

  for (const wallet of wallets) {
    // Get the wallet type
    const walletTypeDoc = await WalletType.findById(wallet.walletType)
    if (!walletTypeDoc) {
      console.log(
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
      console.log(
        `Balance already exists for wallet ${wallet.title}, updating...`,
      )

      await WalletBalance.findByIdAndUpdate(existingBalance.id, {
        amount,
        currency,
        updatedBy: adminId,
        updatedAt: new Date(),
      })

      console.log(
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
    console.log(
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

      console.log('Admin user created')
    } else {
      console.log('Admin user already exists')
    }

    // Create test users
    const users: IUser[] = [adminUser]

    for (const userData of testUsers) {
      const existingUser = await User.findOne({ email: userData.email })

      if (existingUser) {
        console.log(`User ${userData.email} already exists.`)
        users.push(existingUser)
        continue
      }

      const user = await User.create(userData)
      console.log(`Created user: ${user.firstName} ${user.lastName}`)
      users.push(user)
    }

    // Seed wallet types
    const walletTypeDocs = await seedWalletTypes(adminUser.id)

    // Seed wallets
    const wallets = await seedWallets(users, walletTypeDocs)

    // Seed wallet balances
    await seedWalletBalances(wallets, adminUser.id)

    console.log('Wallet seeding completed successfully.')
  } catch (error) {
    console.error('Error in wallet seed:', error)
    throw error
  }
}

export async function walletFeed() {
  try {
    await feed()
    console.log('Wallet seed process completed.')
  } catch (error) {
    console.error('Wallet seed process failed:', error)
    throw error
  }
}
