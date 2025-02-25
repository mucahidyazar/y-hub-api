import mongoose from 'mongoose'

import { VALIDATION_RULES } from '@/constants'

import { IBaseModel, baseSchema } from './base.model'
import { ITransactionBrand } from './transaction-brand'
import { ITransactionCategory } from './transaction-category'
import { IWallet } from './wallet'
import { IWalletBalance } from './wallet-balance'

interface IBaseTransaction extends IBaseModel {
  description: string
  direction: 'income' | 'expense'
  amount: number

  category: mongoose.Types.ObjectId | ITransactionCategory

  brand: mongoose.Types.ObjectId | ITransactionBrand

  wallet: mongoose.Types.ObjectId | IWallet
  walletBalance: mongoose.Types.ObjectId | IWalletBalance
}

const baseTransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    describe: 'Description of the financial movement',
    maxlength: VALIDATION_RULES.input.max,
  },
  direction: {
    type: String,
    describe: 'Direction of the financial movement',
    enum: ['income', 'expense'],
    required: true,
  },

  amount: {
    type: Number,
    describe: 'Amount of the financial movement',
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    describe: 'Category of the financial movement',
    ref: 'TransactionCategory',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    describe: 'Brand of the financial movement',
    ref: 'TransactionBrand',
  },

  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    describe: 'Wallet of the financial movement',
    ref: 'Wallet',
    required: true,
  },
  walletBalance: {
    type: mongoose.Schema.Types.ObjectId,
    describe: 'Wallet balance of the financial movement',
    ref: 'WalletBalance',
    required: true,
  },
}).add(baseSchema)

export { IBaseTransaction, baseTransactionSchema }
