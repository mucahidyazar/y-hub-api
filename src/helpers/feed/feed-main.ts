/* eslint-disable no-console */
import mongoose from 'mongoose'

import 'dotenv/config'

import { transactionFeed } from './transaction-feed'
import { userAuthFeed } from './user-auth-feed'
import { walletFeed } from './wallet-feed'

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('Connected to database...')

    // Run seeders in sequence
    console.log('\n=== RUNNING USER AUTH SEED ===')
    await userAuthFeed()

    console.log('\n=== RUNNING WALLET SEED ===')
    await walletFeed()

    console.log('\n=== RUNNING TRANSACTION SEED ===')
    await transactionFeed()

    console.log('\nAll seeders completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Main seed process failed:', error)
    process.exit(1)
  }
}

// Execute main function
main()
