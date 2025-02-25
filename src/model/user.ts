import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import z from 'zod'

import { DEFAULTS, VALIDATION_RULES } from '@/constants'
import { IRole } from '@/model/role'
import { Setting } from '@/model/setting'
import { passwordSchema } from '@/validation'

interface IUser extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordChangedAt?: Date
  status: string
  avatarUrl?: string
  comparePassword(candidatePassword: string): Promise<boolean>
  defaultWallet?: string
  defaultWalletCurrency?: string

  roles: mongoose.Types.ObjectId[] | IRole[]
  hasRole(roleName: string): boolean
  hasPermission(permissionName: string): Promise<boolean>
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      maxlength: VALIDATION_RULES.input.mid,
      default: '',
    },
    lastName: {
      type: String,
      maxlength: VALIDATION_RULES.input.mid,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(email: string) {
        return z.string().email().parse(email)
      },
    },
    password: {
      type: String,
      minlength: VALIDATION_RULES.password.min,
      maxlength: VALIDATION_RULES.password.max,
      required: true,
      select: false, // Password'ü varsayılan olarak sorgularda döndürme
      validate(password: string) {
        return passwordSchema.safeParse(password).success
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: [],
      },
    ],
    avatarUrl: {
      type: String,
      default: DEFAULTS.avatarUrl,
      validate(avatar: string) {
        if (avatar === '') return true
        return z.string().url().parse(avatar)
      },
    },
    defaultWallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
    },
    defaultWalletCurrency: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

// Parola hashleme
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.passwordChangedAt = new Date()

  if (this.isNew) {
    await Setting.create({ createdBy: this._id })
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Parola karşılaştırma
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Method to check if a user has a specific role
userSchema.methods.hasRole = async function (
  roleName: string,
): Promise<boolean> {
  const isRoleExists = await mongoose.model('Role').exists({
    _id: { $in: this.roles },
    status: 'active',
    name: roleName,
  })

  return !!isRoleExists
}

// Method to check if a user has a specific permission
userSchema.methods.hasPermission = async function (
  permissionName: string,
): Promise<boolean> {
  const isPermissionExists = await mongoose.model('Role').exists({
    _id: { $in: this.roles },
    status: 'active',
    permissions: {
      $elemMatch: { name: permissionName, status: 'active' },
    },
  })

  return !!isPermissionExists
}

const User = mongoose.model<IUser>('User', userSchema)

export { IUser, User }
