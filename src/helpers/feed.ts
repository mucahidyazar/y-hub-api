/* eslint-disable no-console */
import { categories } from '../constants/categories'
import { Transaction } from '../model/transaction'
import { TransactionBrand } from '../model/transaction-brand'
import { TransactionCategory } from '../model/transaction-category'
import { User } from '../model/user'
import { Wallet } from '../model/wallet'
import { WalletBalance } from '../model/wallet-balance'
import { WalletType } from '../model/wallet-type'
import { toCamelCase } from '../utils/string'

import '../config/db'
import { getRandomPastelColor } from './color'
import { generateRandomDate } from './date'
import { getRandomNumber } from './number'

const ADMIN_EMAIL = 'admin@mucahid.dev'
const ADMIN_PASSWORD = '123456789-Aa'

const ME_EMAIL = 'mucahidyazar@gmail.com'
const ME_PASSWORD = '123456789-Aa'

async function getWalletType() {
  let walletTypes = await WalletType.find()

  if (walletTypes.length === 0) {
    const walletTypesData = [
      { label: 'Bank', multipleBalance: true, hasPlatform: true },
      { label: 'Case', multipleBalance: true, hasPlatform: true },
      { label: 'Credit Card', multipleBalance: true, hasPlatform: true },
      { label: 'Deposit', multipleBalance: false, hasPlatform: true },
      { label: 'E-Wallet', multipleBalance: true, hasPlatform: true },
      { label: 'Investment', multipleBalance: true, hasPlatform: true },
      { label: 'Loan', multipleBalance: false, hasPlatform: true },
      { label: 'Savings', multipleBalance: true, hasPlatform: true },
    ]
    walletTypes = await WalletType.insertMany(walletTypesData)
  }

  return walletTypes[0]
}

async function getUser({ email, password }) {
  let user = await User.findOne({ email })

  if (!user) {
    user = await User.create({ email, password })
  }
  console.info(`User ${user.email} is created`)

  return user
}

const getWallet = async ({
  createdBy,
  walletType,
}: {
  createdBy: string
  walletType: string
}) => {
  let wallet = await Wallet.findOne({ createdBy })

  if (!wallet) {
    wallet = await Wallet.create({
      title: 'My Wallet',
      platform: 'Test',
      description: '',
      createdBy,
      walletType,
    })
    console.info(`Wallet ${wallet.title} is created`)
  }

  return wallet
}

async function getWalletBalance({ wallet }: { wallet: string }) {
  let walletBalance = await WalletBalance.findOne({ wallet })

  if (!walletBalance) {
    walletBalance = await WalletBalance.create({
      amount: 10000,
      currency: 'USD',
      wallet,
    })
    console.info(`Wallet Balance ${walletBalance.amount} is created`)
  }

  return walletBalance
}

async function getTransactionBrands({ createdBy }: { createdBy: string }) {
  let transactionBrands = await TransactionBrand.find()

  if (transactionBrands.length === 0) {
    const brandsData = transactionBrands.map(b => ({
      name: toCamelCase(b.id),
      usageCount: 0,
      createdBy,
    }))

    await TransactionBrand.insertMany(brandsData)
    console.info('Brands are fed')
    transactionBrands = await TransactionBrand.find()
  }

  return transactionBrands
}

async function getTransactionCategories({ createdBy }: { createdBy: string }) {
  let transactionCategories = await TransactionCategory.find()

  if (transactionCategories.length === 0) {
    const categoriesData = categories.map(c => ({
      name: toCamelCase(c.id),
      usageCount: 0,
      createdBy,
      icon: c.icon,
      color: getRandomPastelColor(),
    }))

    await TransactionCategory.insertMany(categoriesData)
    console.info('Categories are fed')
    transactionCategories = await TransactionCategory.find()
  }

  return transactionCategories
}

async function getTransactions({ createdBy, wallet, walletBalance }) {
  const transactionCategories = await getTransactionCategories({ createdBy })

  const transactions = transactionCategories.map((t, index) => ({
    type: 'expense',
    dueDate: generateRandomDate({ minYear: 2015, maxYear: 2023 }),
    createdBy,
    wallet,
    walletBalance,
    // eslint-disable-next-line security/detect-object-injection
    category: transactionCategories[index].id,
    amount: getRandomNumber({ min: 10, max: 50 }),
    transactionCurrency: 'USD',
  }))

  await Transaction.insertMany(transactions)
  console.info('Transactions are fed')

  return transactions
}

async function feed() {
  const firstWalletType = await getWalletType()

  const adminUser = await getUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })
  const meUser = await getUser({ email: ME_EMAIL, password: ME_PASSWORD })

  const meWallet = await getWallet({
    createdBy: meUser.id,
    walletType: firstWalletType.id,
  })
  const meWalletBalance = await getWalletBalance({
    wallet: meWallet.id,
  })

  await getTransactionBrands({ createdBy: adminUser.id })

  await getTransactions({
    createdBy: meUser.id,
    wallet: meWallet.id,
    walletBalance: meWalletBalance.id,
  })
  // const subscriptionTransactionsMap = [
  //   'daily',
  //   'daily',
  //   'daily',
  //   'weekly',
  //   'weekly',
  //   'monthly',
  //   'monthly',
  //   'monthly',
  //   'monthly',
  //   'yearly',
  //   'yearly',
  //   'yearly',
  //   'yearly',
  // ].map((r, i) => ({
  //   type: 'expense',
  //   date: generateRandomDate({ minYear: 2015, maxYear: 2023 }),
  //   user: meUser.id,
  //   wallet: meWallet.id,
  //   walletBalance: meWalletBalance.id,
  //   // eslint-disable-next-line security/detect-object-injection
  //   category: allTransactionCategories[i].id,
  //   amount: getRandomNumber({ min: 10, max: 50 }),
  //   transactionCurrency: 'USD',
  //   subscriptionType: r,
  //   subscription: true,
  // }))

  // await Transaction.insertMany(subscriptionTransactionsMap)
}

feed().then(() => {
  console.info('Feed is completed')
  process.exit(0)
})
