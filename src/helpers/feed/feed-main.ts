import mongoose from 'mongoose'

import 'dotenv/config'

import { logger } from '@/client'

import { transactionFeed } from './transaction-feed'
import { userAuthFeed } from './user-auth-feed'
import { walletFeed } from './wallet-feed'

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!)
    logger.info('Connected to database...')

    // Run seeders in sequence
    logger.info('\n=== RUNNING USER AUTH SEED ===')
    await userAuthFeed()

    logger.info('\n=== RUNNING WALLET SEED ===')
    await walletFeed()

    logger.info('\n=== RUNNING TRANSACTION SEED ===')
    await transactionFeed()

    logger.info('\nAll seeders completed successfully!')
    process.exit(0)
  } catch (error) {
    logger.error('Main seed process failed:', error)
    process.exit(1)
  }
}

// Execute main function
main()
