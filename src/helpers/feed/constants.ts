import { IUser } from "@/model/user"

const dataUsers: Partial<IUser>[] = [
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

const testUsers: Partial<IUser>[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    password: 'Password123!',
    status: 'active',
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    password: 'Password123!',
    status: 'active',
  },
]

export { dataUsers, testUsers }