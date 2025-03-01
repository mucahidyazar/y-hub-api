import mongoose from 'mongoose'
import { z } from 'zod'

import { ERROR_MESSAGE, VALIDATION_RULES } from '@/constants'

const transactionBrandSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_RULES.input.min, ERROR_MESSAGE.stringMin('Name'))
    .max(VALIDATION_RULES.input.mid, ERROR_MESSAGE.stringMax('Name')),
  icon: z.string().optional(),
  color: z.string().optional(),
  usageCount: z.number().min(0).optional(),
})

const transactionBrandUpdateSchema = transactionBrandSchema.partial()

const transactionCategorySchema = z.object({
  name: z
    .string()
    .min(VALIDATION_RULES.input.min, ERROR_MESSAGE.stringMin('Name'))
    .max(VALIDATION_RULES.input.mid, ERROR_MESSAGE.stringMax('Name')),
  icon: z.string().optional(),
  color: z.string().optional(),
  usageCount: z.number().min(0).optional(),
})

const transactionCategoryUpdateSchema = transactionCategorySchema.partial()

const transactionSchema = z.object({
  direction: z.enum(['income', 'expense']),
  description: z
    .string({ message: ERROR_MESSAGE.string('Description') })
    .min(VALIDATION_RULES.input.min, ERROR_MESSAGE.stringMin('Description'))
    .max(
      VALIDATION_RULES.input.max,
      ERROR_MESSAGE.stringMax('Description', VALIDATION_RULES.input.max),
    )
    .optional(),
  link: z
    .string({ message: ERROR_MESSAGE.string('Link') })
    .min(VALIDATION_RULES.input.min, ERROR_MESSAGE.stringMin('Link'))
    .max(
      VALIDATION_RULES.input.max,
      ERROR_MESSAGE.stringMax('Link', VALIDATION_RULES.input.max),
    )
    .optional(),
  subscriptionRecurrence: z.number().min(1).default(1),
  subscription: z.boolean().default(false),
  subscriptionType: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  dueDate: z.string().or(z.date()),
  amount: z.number().positive({
    message: 'Amount must be a positive number.',
  }),
  transactionCurrency: z
    .string({ message: 'Please select a currency.' })
    .min(1, { message: 'Please select a currency' }),

  wallet: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  }),
  walletBalance: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  }),
  categoryId: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  }).optional(),
  brandId: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  }).optional(),
})

const transactionUpdateSchema = transactionSchema.partial()

export {
  transactionBrandSchema,
  transactionBrandUpdateSchema,
  transactionCategorySchema,
  transactionCategoryUpdateSchema,
  transactionSchema,
  transactionUpdateSchema,
}
