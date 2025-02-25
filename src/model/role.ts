import mongoose, { Schema, model, Document, Model } from 'mongoose'

import { baseSchema } from './base.model'
import { IPermission } from './permission'

interface IRole extends Document {
  name: string // e.g., "admin", "editor", "viewer"
  description: string // Human-readable description
  permissions: mongoose.Types.ObjectId[] | IPermission[]
  isSystem: boolean // System roles cannot be modified by users

  hasPermission(permissionName: string): boolean // Method to check if role has a specific permission
}

interface IRoleModel extends Model<IRole> {
  assignPermissions(roleId: string, permissionIds: string[]): Promise<IRole>
  removePermissions(roleId: string, permissionIds: string[]): Promise<IRole>
}

const roleSchema = new Schema({
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
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
  isSystem: {
    type: Boolean,
    default: false,
  },
}).add(baseSchema)

// Method to check if a role has a specific permission
roleSchema.methods.hasPermission = async function (
  permissionName: string,
): Promise<boolean> {
  const isPermissionExists = await mongoose.model('Role').exists({
    _id: this._id,
    permissions: { $elemMatch: { name: permissionName, status: 'active' } },
  })

  return !!isPermissionExists
}

// Create a static method to assign permissions to a role
roleSchema.statics.assignPermissions = async function (
  roleId: string,
  permissionIds: string[],
): Promise<IRole> {
  return this.findByIdAndUpdate(
    roleId,
    { $addToSet: { permissions: { $each: permissionIds } } },
    { new: true },
  ).exec()
}

// Create a static method to remove permissions from a role
roleSchema.statics.removePermissions = async function (
  roleId: string,
  permissionIds: string[],
): Promise<IRole> {
  return this.findByIdAndUpdate(
    roleId,
    { $pull: { permissions: { $in: permissionIds } } },
    { new: true },
  ).exec()
}

const Role = model<IRole, IRoleModel>('Role', roleSchema)

export { IRole, Role }
