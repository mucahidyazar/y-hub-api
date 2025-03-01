import mongoose from 'mongoose'
import { z } from 'zod'

import { ERROR_MESSAGE, VALIDATION_RULES } from '@/constants'

const walletBalanceCreateSchema = z.object({
  amount: z.number().default(0),
  currency: z.string().min(1).max(5), // like USD, EUR
  action: z.enum(['initial', 'updated', 'deleted']).optional(),
})

// Accessor işlemleri için
export const walletAccessorCreateSchema = z.object({
  user: z.object({
    email: z
      .string({
        required_error: ERROR_MESSAGE.required('Email'),
        message: ERROR_MESSAGE.string('Email'),
      })
      .email(ERROR_MESSAGE.invalid('Email')),
  }),
  action: z.enum(['initial', 'updated', 'deleted']).optional(),
})

export const walletAccessorUpdateSchema = walletAccessorCreateSchema

export const walletSchema = z.object({
  title: z
    .string({
      required_error: ERROR_MESSAGE.required('Title'),
      message: ERROR_MESSAGE.string('Title'),
    })
    .min(VALIDATION_RULES.input.min, ERROR_MESSAGE.stringMin('Title'))
    .max(VALIDATION_RULES.input.mid, ERROR_MESSAGE.stringMax('Title')),

  description: z
    .string({
      message: ERROR_MESSAGE.string('Description'),
    })
    .max(
      VALIDATION_RULES.input.max,
      ERROR_MESSAGE.stringMax('Description', VALIDATION_RULES.input.max),
    )
    .optional(),

  design: z
    .string()
    .min(VALIDATION_RULES.input.min)
    .max(VALIDATION_RULES.input.max)
    .default('design-0'),

  platform: z
    .string({
      message: ERROR_MESSAGE.string('Platform name'),
      required_error: ERROR_MESSAGE.required('Platform name'),
    })
    .min(VALIDATION_RULES.input.min, ERROR_MESSAGE.stringMin('Platform name'))
    .max(VALIDATION_RULES.input.mid, ERROR_MESSAGE.stringMax('Platform name'))
    .optional(),

  walletBalances: z.array(walletBalanceCreateSchema).default([]),

  walletType: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  }),

  accessors: z.array(walletAccessorCreateSchema).optional().default([]),
})

export const walletUpdateSchema = walletSchema.partial()
