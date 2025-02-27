/* eslint-disable no-console */
import { Role } from '@/model/role'
import { IUser, User } from '@/model/user'

// Define user creator (same as the one used in other seeds)
const userCreatorData: Partial<IUser> = {
  firstName: 'Super',
  lastName: 'Admin',
  email: 'superadmin@admin.com',
  password: '123456789-Aa',
  status: 'active',
}

// Define user-role mapping
const userRoles: Record<string, string[]> = {
  'admin@example.com': ['Super Admin'],
  'system@example.com': ['System'],
  'administrator@example.com': ['Administrator'],
  'orgadmin@example.com': ['Organization Admin'],
  'usermanager@example.com': ['User Manager'],
  'contentmanager@example.com': ['Content Manager'],
  'transactionmanager@example.com': ['Transaction Manager'],
  'user@example.com': ['Standard User'],
  'guest@example.com': ['Guest'],
  'viewer@example.com': ['Viewer'],
  'apiclient@example.com': ['API Client'],
  'auditor@example.com': ['Auditor'],
  'multi@example.com': ['User Manager', 'Content Manager'], // User with multiple roles
}

// Define sample users
const userData: Partial<IUser>[] = [
  // Admin users
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'System',
    lastName: 'Service',
    email: 'system@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'App',
    lastName: 'Administrator',
    email: 'administrator@example.com',
    password: '123456789-Aa',
    status: 'active',
  },

  // Manager users
  {
    firstName: 'Org',
    lastName: 'Admin',
    email: 'orgadmin@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'User',
    lastName: 'Manager',
    email: 'usermanager@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'Content',
    lastName: 'Manager',
    email: 'contentmanager@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'Transaction',
    lastName: 'Manager',
    email: 'transactionmanager@example.com',
    password: '123456789-Aa',
    status: 'active',
  },

  // Regular users
  {
    firstName: 'Standard',
    lastName: 'User',
    email: 'user@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'Guest',
    lastName: 'User',
    email: 'guest@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'View',
    lastName: 'Only',
    email: 'viewer@example.com',
    password: '123456789-Aa',
    status: 'active',
  },

  // Special users
  {
    firstName: 'API',
    lastName: 'Client',
    email: 'apiclient@example.com',
    password: '123456789-Aa',
    status: 'active',
  },
  {
    firstName: 'System',
    lastName: 'Auditor',
    email: 'auditor@example.com',
    password: '123456789-Aa',
    status: 'active',
  },

  // Multi-role user
  {
    firstName: 'Multi',
    lastName: 'Role',
    email: 'multi@example.com',
    password: '123456789-Aa',
    status: 'active',
  },

  // Inactive user
  {
    firstName: 'Inactive',
    lastName: 'User',
    email: 'inactive@example.com',
    password: '123456789-Aa',
    status: 'inactive',
  },
]

async function feed() {
  try {
    // First ensure we have a user creator
    let userCreator: IUser | null = await User.findOne({
      email: userCreatorData.email,
    })

    if (!userCreator) {
      userCreator = await User.create(userCreatorData)

      if (!userCreator) {
        throw new Error('User creator could not be created')
      }
    }

    // Fetch all roles to get their IDs
    const allRoles = await Role.find({ status: 'active' })

    console.log(`Fetched ${allRoles.length} roles from database`)

    if (allRoles.length === 0) {
      console.warn('Warning: No roles found in database. Run role seed first.')
      throw new Error('No roles found in database. Run role seed first.')
    }

    // Create a map of role names to their IDs for quick lookup
    const roleMap = new Map()
    allRoles.forEach(role => {
      roleMap.set(role.name, role._id)
    })

    // Process each user and assign roles
    for (const user of userData) {
      // Skip if user exists
      const existingUser = await User.findOne({ email: user.email })
      if (existingUser) {
        console.log(
          `User with email "${user.email}" already exists, updating roles...`,
        )

        // Get role IDs for this user
        const rolesToAssign = userRoles[user.email as string] || []
        const roleIds = rolesToAssign
          .map(roleName => roleMap.get(roleName))
          .filter(id => id) // Filter out any undefined IDs

        // Update user with roles
        if (roleIds.length > 0) {
          await User.findByIdAndUpdate(
            existingUser._id,
            { roles: roleIds },
            { new: true },
          )
          console.log(
            `Updated user "${user.email}" with ${roleIds.length} roles`,
          )
        }

        continue
      }

      // Get role IDs for this user
      const rolesToAssign = userRoles[user.email as string] || []
      const roleIds = rolesToAssign
        .map(roleName => roleMap.get(roleName))
        .filter(id => id) // Filter out any undefined IDs

      // Add creator and roles to the user
      user.roles = roleIds

      // Create the user with roles
      const createdUser = await User.create(user)
      console.log(`Created user "${user.email}" with ${roleIds.length} roles`)

      // Log the assigned roles
      if (createdUser && roleIds.length > 0) {
        console.log(`Roles for ${user.email}: ${rolesToAssign.join(', ')}`)
      }
    }

    console.log('User seeding completed successfully.')
  } catch (error) {
    console.error('Error in user seed:', error)
    throw error
  }
}

// Run the seed function
feed()
  .then(() => {
    console.log('User seed process completed.')
  })
  .catch(err => {
    console.error('User seed process failed:', err)
  })
