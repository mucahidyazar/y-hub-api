import { logger } from '@/client'
import { Role } from '@/model/role'
import { IUser, User } from '@/model/user'

import { adminUserData, sampleRoleUsers, roleUsersMapping } from './constants'

async function feed() {
  try {
    // First ensure we have a user creator
    let userCreator: IUser | null = await User.findOne({
      email: adminUserData.email,
    })

    if (!userCreator) {
      userCreator = await User.create(adminUserData)

      if (!userCreator) {
        throw new Error('User creator could not be created')
      }
    }

    // Fetch all roles to get their IDs
    const allRoles = await Role.find({ status: 'active' })

    logger.info(`Fetched ${allRoles.length} roles from database`)

    if (allRoles.length === 0) {
      logger.warn('Warning: No roles found in database. Run role seed first.')
      throw new Error('No roles found in database. Run role seed first.')
    }

    // Create a map of role names to their IDs for quick lookup
    const roleMap = new Map()
    allRoles.forEach(role => {
      roleMap.set(role.name, role._id)
    })

    // Process each user and assign roles
    for (const user of sampleRoleUsers) {
      // Skip if user exists
      const existingUser = await User.findOne({ email: user.email })
      if (existingUser) {
        logger.info(
          `User with email "${user.email}" already exists, updating roles...`,
        )

        // Get role IDs for this user
        const rolesToAssign = roleUsersMapping[user.email as string] || []
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
          logger.info(
            `Updated user "${user.email}" with ${roleIds.length} roles`,
          )
        }

        continue
      }

      // Get role IDs for this user
      const rolesToAssign = roleUsersMapping[user.email as string] || []
      const roleIds = rolesToAssign
        .map(roleName => roleMap.get(roleName))
        .filter(id => id) // Filter out any undefined IDs

      // Add creator and roles to the user
      user.roles = roleIds

      // Create the user with roles
      const createdUser = await User.create(user)
      logger.info(`Created user "${user.email}" with ${roleIds.length} roles`)

      // Log the assigned roles
      if (createdUser && roleIds.length > 0) {
        logger.info(`Roles for ${user.email}: ${rolesToAssign.join(', ')}`)
      }
    }

    logger.info('User seeding completed successfully.')
  } catch (error) {
    logger.error('Error in user seed:', error)
    throw error
  }
}

// Run the seed function
feed()
  .then(() => {
    logger.info('User seed process completed.')
  })
  .catch(err => {
    logger.error('User seed process failed:', err)
  })
