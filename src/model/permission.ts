import { Schema, model } from 'mongoose'

import { baseSchema, IBaseModel } from './base.model'

interface IPermission extends IBaseModel {
  name: string // e.g., "create:users", "read:transactions"
  description: string // Human-readable description
  resource: string // The resource this permission applies to (e.g., "users", "transactions")
  action: string // The action type (e.g., "create", "read", "update", "delete")
  conditions?: object // Optional JSON conditions for fine-grained access control
}

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
    index: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'read', 'update', 'delete', 'manage'],
    index: true,
  },
  conditions: {
    type: Object,
    default: null,
  },
}).add(baseSchema)

// Compound index for efficient permission lookups
permissionSchema.index({ resource: 1, action: 1 }, { unique: true })

const Permission = model<IPermission>('Permission', permissionSchema)

export { IPermission, Permission }
