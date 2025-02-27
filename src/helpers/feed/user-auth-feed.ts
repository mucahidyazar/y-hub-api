import mongoose from 'mongoose'

import { logger } from '@/client'
import { IPermission, Permission } from '@/model/permission'
import { IRole, Role } from '@/model/role'
import { IUser, User } from '@/model/user'

import { adminUserData, sampleRoleUsers, roleUsersMapping } from './constants'

// ================================
// PERMISSION DATA
// ================================
const permissionData: Partial<IPermission>[] = [
  // User permissions
  {
    name: 'create:user',
    description: 'Create a new user',
    resource: 'user',
    action: 'create',
    status: 'active',
  },
  {
    name: 'read:user',
    description: 'Read user information',
    resource: 'user',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:user',
    description: 'Update user information',
    resource: 'user',
    action: 'update',
    status: 'active',
  },
  {
    name: 'delete:user',
    description: 'Delete a user',
    resource: 'user',
    action: 'delete',
    status: 'active',
  },
  {
    name: 'manage:user',
    description: 'Full access to user management',
    resource: 'user',
    action: 'manage',
    status: 'active',
  },

  // Role permissions
  {
    name: 'create:role',
    description: 'Create a new role',
    resource: 'role',
    action: 'create',
    status: 'active',
  },
  {
    name: 'read:role',
    description: 'Read role information',
    resource: 'role',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:role',
    description: 'Update role information',
    resource: 'role',
    action: 'update',
    status: 'active',
  },
  {
    name: 'delete:role',
    description: 'Delete a role',
    resource: 'role',
    action: 'delete',
    status: 'active',
  },
  {
    name: 'manage:role',
    description: 'Full access to role management',
    resource: 'role',
    action: 'manage',
    status: 'active',
  },

  // Permission permissions
  {
    name: 'create:permission',
    description: 'Create a new permission',
    resource: 'permission',
    action: 'create',
    status: 'active',
  },
  {
    name: 'read:permission',
    description: 'Read permission information',
    resource: 'permission',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:permission',
    description: 'Update permission information',
    resource: 'permission',
    action: 'update',
    status: 'active',
  },
  {
    name: 'delete:permission',
    description: 'Delete a permission',
    resource: 'permission',
    action: 'delete',
    status: 'active',
  },
  {
    name: 'manage:permission',
    description: 'Full access to permission management',
    resource: 'permission',
    action: 'manage',
    status: 'active',
  },

  // Organization permissions
  {
    name: 'create:organization',
    description: 'Create a new organization',
    resource: 'organization',
    action: 'create',
    status: 'active',
  },
  {
    name: 'read:organization',
    description: 'Read organization information',
    resource: 'organization',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:organization',
    description: 'Update organization information',
    resource: 'organization',
    action: 'update',
    status: 'active',
  },
  {
    name: 'delete:organization',
    description: 'Delete an organization',
    resource: 'organization',
    action: 'delete',
    status: 'active',
  },
  {
    name: 'manage:organization',
    description: 'Full access to organization management',
    resource: 'organization',
    action: 'manage',
    status: 'active',
  },

  // Profile permissions
  {
    name: 'read:profile',
    description: 'Read profile information',
    resource: 'profile',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:profile',
    description: 'Update profile information',
    resource: 'profile',
    action: 'update',
    status: 'active',
  },
  {
    name: 'manage:profile',
    description: 'Full access to profile management',
    resource: 'profile',
    action: 'manage',
    status: 'active',
  },

  // Settings permissions
  {
    name: 'read:settings',
    description: 'Read application settings',
    resource: 'settings',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:settings',
    description: 'Update application settings',
    resource: 'settings',
    action: 'update',
    status: 'active',
  },
  {
    name: 'manage:settings',
    description: 'Full access to settings management',
    resource: 'settings',
    action: 'manage',
    status: 'active',
  },

  // Transaction permissions
  {
    name: 'create:transaction',
    description: 'Create a new transaction',
    resource: 'transaction',
    action: 'create',
    status: 'active',
  },
  {
    name: 'read:transaction',
    description: 'Read transaction information',
    resource: 'transaction',
    action: 'read',
    status: 'active',
  },
  {
    name: 'update:transaction',
    description: 'Update transaction information',
    resource: 'transaction',
    action: 'update',
    status: 'active',
  },
  {
    name: 'delete:transaction',
    description: 'Delete a transaction',
    resource: 'transaction',
    action: 'delete',
    status: 'active',
  },
  {
    name: 'manage:transaction',
    description: 'Full access to transaction management',
    resource: 'transaction',
    action: 'manage',
    status: 'active',
  },
]

// ================================
// ROLE DATA
// ================================

// Define role-permission mapping
const rolePermissions: Record<string, string[]> = {
  // System Roles
  'Super Admin': [
    // All permissions - using wildcards to indicate "all of this type"
    'manage:user',
    'manage:role',
    'manage:permission',
    'manage:organization',
    'manage:profile',
    'manage:settings',
    'manage:transaction',
  ],
  System: [
    'manage:user',
    'manage:role',
    'manage:permission',
    'manage:settings',
    'manage:transaction',
  ],

  // Administrative Roles
  Administrator: [
    'manage:user',
    'manage:role',
    'read:permission',
    'manage:organization',
    'manage:settings',
  ],
  'Organization Admin': [
    'create:user',
    'read:user',
    'update:user',
    'read:role',
    'manage:organization',
    'read:settings',
  ],

  // Manager Roles
  'User Manager': [
    'create:user',
    'read:user',
    'update:user',
    'delete:user',
    'read:role',
    'read:organization',
  ],
  'Content Manager': [
    'read:user',
    'read:organization',
    'read:settings',
    'update:settings',
  ],
  'Transaction Manager': [
    'create:transaction',
    'read:transaction',
    'update:transaction',
    'delete:transaction',
    'read:user',
    'read:organization',
  ],

  // Standard User Roles
  'Standard User': [
    'read:user',
    'read:organization',
    'read:profile',
    'update:profile',
    'create:transaction',
    'read:transaction',
  ],
  Guest: ['read:profile'],
  Viewer: ['read:user', 'read:organization', 'read:transaction'],

  // Special Roles
  'API Client': [
    'read:user',
    'read:organization',
    'create:transaction',
    'read:transaction',
  ],
  Auditor: [
    'read:user',
    'read:role',
    'read:permission',
    'read:organization',
    'read:transaction',
    'read:settings',
  ],
}

// Define base role data (without permissions)
const roleData: Partial<IRole>[] = [
  // System Roles
  {
    name: 'Super Admin',
    description: 'Full access to the entire system with all permissions',
    isSystem: true,
    status: 'active',
  },
  {
    name: 'System',
    description: 'Role for system operations and automation',
    isSystem: true,
    status: 'active',
  },

  // Administrative Roles
  {
    name: 'Administrator',
    description: 'Administrative access with most system permissions',
    isSystem: false,
    status: 'active',
  },
  {
    name: 'Organization Admin',
    description: 'Full access to manage an organization',
    isSystem: false,
    status: 'active',
  },

  // Manager Roles
  {
    name: 'User Manager',
    description: 'Manages user accounts and permissions',
    isSystem: false,
    status: 'active',
  },
  {
    name: 'Content Manager',
    description: 'Manages content and related resources',
    isSystem: false,
    status: 'active',
  },
  {
    name: 'Transaction Manager',
    description: 'Manages and oversees transactions',
    isSystem: false,
    status: 'active',
  },

  // Standard User Roles
  {
    name: 'Standard User',
    description: 'Regular user with basic access permissions',
    isSystem: false,
    status: 'active',
  },
  {
    name: 'Guest',
    description: 'Limited access for guest users',
    isSystem: false,
    status: 'active',
  },
  {
    name: 'Viewer',
    description: 'Read-only access to designated resources',
    isSystem: false,
    status: 'active',
  },

  // Special Roles
  {
    name: 'API Client',
    description: 'Role for API integrations and services',
    isSystem: true,
    status: 'active',
  },
  {
    name: 'Auditor',
    description: 'Read access to audit logs and system activities',
    isSystem: false,
    status: 'active',
  },
]

// ================================
// HELPER FUNCTIONS
// ================================

// 1. Seed permissions
async function seedPermissions(
  adminId: mongoose.Types.ObjectId,
): Promise<IPermission[]> {
  logger.info('\n=== SEEDING PERMISSIONS ===')

  const permissions: IPermission[] = []

  for (const permission of permissionData) {
    const existingPermission = await Permission.findOne({
      name: permission.name,
    })

    if (existingPermission) {
      logger.info(`Permission "${permission.name}" already exists, skipping.`)
      permissions.push(existingPermission)
      continue
    }

    // Add creator to the permission
    permission.createdBy = adminId

    // Create the permission
    const createdPermission = await Permission.create(permission)
    logger.info(`Created permission: ${permission.name}`)
    permissions.push(createdPermission)
  }

  logger.info(`Seeded ${permissions.length} permissions.`)
  return permissions
}

// 2. Seed roles with permissions
async function seedRoles(
  permissions: IPermission[],
  adminId: mongoose.Types.ObjectId,
): Promise<IRole[]> {
  logger.info('\n=== SEEDING ROLES ===')

  // Create a map of permission names to their IDs for quick lookup
  const permissionMap = new Map<string, mongoose.Types.ObjectId>()
  permissions.forEach(permission => {
    permissionMap.set(permission.name, permission._id)
  })

  const roles: IRole[] = []

  for (const role of roleData) {
    // Skip if role exists
    const existingRole = await Role.findOne({ name: role.name })
    if (existingRole) {
      logger.info(`Role "${role.name}" already exists, skipping creation.`)
      roles.push(existingRole)
      continue
    }

    // Get permission IDs for this role
    const permissionsForRole = rolePermissions[role.name as string] || []
    const permissionIds = permissionsForRole
      .map(permName => permissionMap.get(permName))
      .filter(id => id) // Filter out any undefined IDs

    // Add creator and permissions to the role
    role.createdBy = adminId
    role.permissions = permissionIds as mongoose.Types.ObjectId[]

    // Create the role with its permissions
    const createdRole = await Role.create(role)
    logger.info(
      `Created role "${role.name}" with ${permissionIds.length} permissions`,
    )
    roles.push(createdRole)
  }

  logger.info(`Seeded ${roles.length} roles.`)
  return roles
}

// 3. Seed users with roles
async function seedUsers(
  roles: IRole[],
  adminId: mongoose.Types.ObjectId,
): Promise<IUser[]> {
  logger.info('\n=== SEEDING USERS ===')

  // Create a map of role names to their IDs for quick lookup
  const roleMap = new Map<string, mongoose.Types.ObjectId>()
  roles.forEach(role => {
    roleMap.set(role.name, role._id)
  })

  const users: IUser[] = []

  // Track if admin user was created as a new user
  let isAdminNew = false

  // Process each user and assign roles
  for (const user of sampleRoleUsers) {
    // Skip if user exists
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) {
      logger.info(`User "${user.email}" already exists, updating roles...`)

      // Get role IDs for this user
      const rolesToAssign = roleUsersMapping[user.email as string] || []
      const roleIds = rolesToAssign
        .map(roleName => roleMap.get(roleName))
        .filter(id => id) as mongoose.Types.ObjectId[] // Filter out any undefined IDs

      // Update user with roles
      if (roleIds.length > 0) {
        const updatedUser = await User.findByIdAndUpdate(
          existingUser._id,
          { roles: roleIds },
          { new: true },
        )
        logger.info(
          `Updated user "${user.email}" with ${roleIds.length} roles: ${rolesToAssign.join(', ')}`,
        )
        if (updatedUser) {
          users.push(updatedUser)
        } else {
          users.push(existingUser)
        }
      } else {
        users.push(existingUser)
      }

      // Check if this is the admin user
      if (user.email === adminUserData.email) {
        isAdminNew = false
      }

      continue
    }

    // Get role IDs for this user
    const rolesToAssign = roleUsersMapping[user.email as string] || []
    const roleIds = rolesToAssign
      .map(roleName => roleMap.get(roleName))
      .filter(id => id) as mongoose.Types.ObjectId[] // Filter out any undefined IDs

    // Add creator and roles to the user
    user.roles = roleIds

    // Create the user with roles
    const createdUser = await User.create(user)
    logger.info(`Created user "${user.email}" with ${roleIds.length} roles`)

    // Log the assigned roles
    if (roleIds.length > 0) {
      logger.info(`Roles for ${user.email}: ${rolesToAssign.join(', ')}`)
    }

    users.push(createdUser)

    // Check if this is the admin user
    if (user.email === adminUserData.email) {
      isAdminNew = true
    }
  }

  // If admin was created as a new user, we need to update references
  if (isAdminNew) {
    const adminUser = users.find(u => u.email === adminUserData.email)
    if (adminUser) {
      // Update all permissions, roles, and users to use the new admin ID
      await Permission.updateMany(
        { createdBy: adminId },
        { createdBy: adminUser._id },
      )

      await Role.updateMany(
        { createdBy: adminId },
        { createdBy: adminUser._id },
      )

      await User.updateMany(
        { createdBy: adminId, _id: { $ne: adminUser._id } },
        { createdBy: adminUser._id },
      )

      logger.info('Updated creator references to use the new admin user ID.')
    }
  }

  logger.info(`Seeded ${users.length} users.`)
  return users
}

// ================================
// MAIN FEED FUNCTION
// ================================

async function feed() {
  try {
    logger.info('Starting user authorization seed process...')

    // 1. Create or get admin user first
    let adminUser = await User.findOne({ email: adminUserData.email })

    if (!adminUser) {
      adminUser = await User.create({
        ...adminUserData,
        roles: [], // We'll update this later
      })

      if (!adminUser) {
        throw new Error('Failed to create admin user')
      }

      logger.info('Admin user created')
    } else {
      logger.info('Admin user already exists')
    }

    // 2. Seed permissions using admin as creator
    const permissions = await seedPermissions(adminUser.id)

    // 3. Seed roles with permissions
    const roles = await seedRoles(permissions, adminUser.id)

    // 4. Seed users with roles (including updating admin's roles)
    await seedUsers(roles, adminUser.id)

    logger.info('\nUser authorization seeding completed successfully!')
    return { success: true }
  } catch (error) {
    logger.error('Error in user authorization seed:', error)
    throw error
  }
}

export async function userAuthFeed() {
  try {
    await feed()
    logger.info('User auth seed process completed.')
  } catch (error) {
    logger.error('User auth seed process failed:', error)
    throw error
  }
}
