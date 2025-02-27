import { logger } from '@/client'
import { IInstallment } from '@/model/installment'
import { ISubscription } from '@/model/subscription'
import { ITransaction } from '@/model/transaction'
import { ITransactionBrand } from '@/model/transaction-brand'
import { ITransactionCategory } from '@/model/transaction-category'
import { IUser } from '@/model/user'

import { sampleNormalUsers } from './constants'

const transactionBrands: Partial<ITransactionBrand>[] = [
  {
    name: 'Amazon',
    icon: 'Amazon',
    color: '#FF5733',
  },
  {
    name: 'Apple',
    icon: 'Apple',
    color: '#FF5733',
  },
  {
    name: 'Google',
    icon: 'Google',
    color: '#FF5733',
  },
  {
    name: 'Microsoft',
    icon: 'Microsoft',
    color: '#FF5733',
  },
  {
    name: 'Facebook',
    icon: 'Facebook',
    color: '#FF5733',
  },
  {
    name: 'Twitter',
    icon: 'Twitter',
    color: '#FF5733',
  },
  {
    name: 'Instagram',
    icon: 'Instagram',
    color: '#FF5733',
  },
  {
    name: 'Tesla',
    icon: 'Tesla',
    color: '#FF5733',
  },
  {
    name: 'Netflix',
    icon: 'Netflix',
    color: '#FF5733',
  },
  {
    name: 'Spotify',
    icon: 'Spotify',
    color: '#FF5733',
  },
  {
    name: 'Disney+',
    icon: 'Disney',
    color: '#FF5733',
  },
  {
    name: 'Hulu',
    icon: 'Hulu',
    color: '#FF5733',
  },
  {
    name: 'Wallmart',
    icon: 'Wallmart',
    color: '#FF5733',
  },
  {
    name: 'Migros',
    icon: 'Migros',
    color: '#FF5733',
  },
  {
    name: 'Lidl',
    icon: 'Lidl',
    color: '#FF5733',
  },
  {
    name: 'Aldi',
    icon: 'Aldi',
    color: '#FF5733',
  },
  {
    name: 'Rewe',
    icon: 'Rewe',
    color: '#FF5733',
  },
]

const transactionCategories: Partial<ITransactionCategory>[] = [
  { name: 'Rent', icon: 'Home', color: '#FF5733' },
  { name: 'Mortgage', icon: 'DollarSign', color: '#FF5733' },
  { name: 'Electricity', icon: 'Zap', color: '#FF5733' },
  { name: 'Water', icon: 'Droplet', color: '#FF5733' },
  { name: 'Gas', icon: 'Flame', color: '#FF5733' },
  { name: 'Internet', icon: 'Globe', color: '#FF5733' },
  { name: 'Phone', icon: 'Phone', color: '#FF5733' },
  { name: 'Groceries', icon: 'ShoppingCart', color: '#FF5733' },
  { name: 'Dining', icon: 'Utensils', color: '#FF5733' },
  { name: 'Transportation', icon: 'Car', color: '#FF5733' },
  { name: 'Fuel', icon: 'Fuel', color: '#FF5733' },
  { name: 'Insurance', icon: 'Shield', color: '#FF5733' },
  { name: 'Maintenance', icon: 'Wrench', color: '#FF5733' },
  { name: 'Healthcare', icon: 'HeartPulse', color: '#FF5733' },
  { name: 'Dentistry', icon: 'Stethoscope', color: '#FF5733' },
  { name: 'Medication', icon: 'Pill', color: '#FF5733' },
  { name: 'Fitness', icon: 'Dumbbell', color: '#FF5733' },
  { name: 'Clothing', icon: 'Shirt', color: '#FF5733' },
  { name: 'Debt', icon: 'FileMinus', color: '#FF5733' },
  { name: 'Grooming', icon: 'Scissors', color: '#FF5733' },
  { name: 'Gifts', icon: 'Gift', color: '#FF5733' },
  { name: 'Travel', icon: 'PlaneTakeoff', color: '#FF5733' },
  { name: 'Accommodation', icon: 'Hotel', color: '#FF5733' },
  { name: 'Flights', icon: 'Plane', color: '#FF5733' },
  { name: 'Education', icon: 'Book', color: '#FF5733' },
  { name: 'Loan', icon: 'DollarSign', color: '#FF5733' },
  { name: 'Books', icon: 'BookOpen', color: '#FF5733' },
  { name: 'Entertainment', icon: 'Film', color: '#FF5733' },
  { name: 'Furniture', icon: 'Sofa', color: '#FF5733' },
  { name: 'Cleaning', icon: 'Stamp', color: '#FF5733' },
  { name: 'Gardening', icon: 'Leaf', color: '#FF5733' },
  { name: 'Renovation', icon: 'Hammer', color: '#FF5733' },
  { name: 'Appliances', icon: 'Tv', color: '#FF5733' },
  { name: 'Childcare', icon: 'Baby', color: '#FF5733' },
  { name: 'Tuition', icon: 'GraduationCap', color: '#FF5733' },
  { name: 'Toys', icon: 'ToyBrick', color: '#FF5733' },
  { name: 'Pets', icon: 'Dog', color: '#FF5733' },
  { name: 'Vet', icon: 'Stethoscope', color: '#FF5733' },
  { name: 'Petfood', icon: 'Bone', color: '#FF5733' },
  { name: 'Subscriptions', icon: 'Package', color: '#FF5733' },
  { name: 'Gaming', icon: 'Gamepad', color: '#FF5733' },
  { name: 'Hobbies', icon: 'Palette', color: '#FF5733' },
  { name: 'Sports', icon: 'Volleyball', color: '#FF5733' },
  { name: 'Camping', icon: 'Tent', color: '#FF5733' },
  { name: 'Instruments', icon: 'Music2', color: '#FF5733' },
  { name: 'Photography', icon: 'Camera', color: '#FF5733' },
  { name: 'Crafts', icon: 'Scissors', color: '#FF5733' },
  { name: 'Electronics', icon: 'Smartphone', color: '#FF5733' },
  { name: 'Software', icon: 'Cpu', color: '#FF5733' },
  { name: 'Accessories', icon: 'Watch', color: '#FF5733' },
  { name: 'Learning', icon: 'School', color: '#FF5733' },
  { name: 'Memberships', icon: 'UserCheck', color: '#FF5733' },
  { name: 'Consulting', icon: 'Briefcase', color: '#FF5733' },
  { name: 'Legal', icon: 'Scale', color: '#FF5733' },
  { name: 'Accounting', icon: 'Calculator', color: '#FF5733' },
  { name: 'Premiums', icon: 'DollarSign', color: '#FF5733' },
  { name: 'Advertising', icon: 'Megaphone', color: '#FF5733' },
  { name: 'Hosting', icon: 'Server', color: '#FF5733' },
  { name: 'Office', icon: 'Briefcase', color: '#FF5733' },
  { name: 'Equipment', icon: 'Cable', color: '#FF5733' },
  { name: 'Stationery', icon: 'PenTool', color: '#FF5733' },
  { name: 'Catering', icon: 'CookingPot', color: '#FF5733' },
  { name: 'Events', icon: 'Calendar', color: '#FF5733' },
  { name: 'Conferences', icon: 'Presentation', color: '#FF5733' },
  { name: 'Food', icon: 'Utensils', color: '#FF5733' },
  { name: 'Marketing', icon: 'LineChart', color: '#FF5733' },
  { name: 'Repairs', icon: 'Wrench', color: '#FF5733' },
  { name: 'Workshops', icon: 'Wrench', color: '#FF5733' },
  { name: 'Therapy', icon: 'Heart', color: '#FF5733' },
  { name: 'Streaming', icon: 'Monitor', color: '#FF5733' },
  { name: 'Banking', icon: 'Landmark', color: '#FF5733' },
  { name: 'Security', icon: 'Lock', color: '#FF5733' },
  { name: 'Utilities', icon: 'Zap', color: '#FF5733' },
  { name: 'Donations', icon: 'HandHeart', color: '#FF5733' },
  { name: 'Charities', icon: 'HelpingHand', color: '#FF5733' },
  { name: 'Fees', icon: 'CreditCard', color: '#FF5733' },
  { name: 'Taxes', icon: 'FileText', color: '#FF5733' },
  { name: 'Gasoline', icon: 'Fuel', color: '#FF5733' },
  { name: 'RideShare', icon: 'Car', color: '#FF5733' },
  { name: 'Bicycles', icon: 'Bike', color: '#FF5733' },
  { name: 'Parking', icon: 'ParkingCircle', color: '#FF5733' },
]

const installments: Partial<IInstallment>[] = [
  {
    description: 'Installment 1',
    direction: 'expense',
    amount: 100,
    installmentStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Installment 2',
    direction: 'expense',
    amount: 100,
    installmentStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Installment 3',
    direction: 'expense',
    amount: 100,
    installmentStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Installment 4',
    direction: 'expense',
    amount: 100,
    installmentStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Installment 5',
    direction: 'expense',
    amount: 100,
    installmentStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
]

const subscriptions: Partial<ISubscription>[] = [
  {
    description: 'Subscription 1',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Subscription 2',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    autoRenew: true,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
  },
  {
    description: 'Subscription 3',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Subscription 4',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    autoRenew: true,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
  },
  {
    description: 'Subscription 5',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Subscription 6',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    autoRenew: true,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
  },
  {
    description: 'Subscription 7',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
  },
  {
    description: 'Subscription 8',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    autoRenew: true,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
  },
  {
    description: 'Subscription 9',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-01'),
  },
  {
    description: 'Subscription 10',
    direction: 'expense',
    amount: 100,
    subscriptionStatus: 'continuing',
    frequency: 'monthly',
    repeat: 12,
    autoRenew: true,
    totalAmount: 1200,
    startDate: new Date('2024-01-01'),
  },
]

const user1Transactions: Partial<ITransaction>[] = [
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 1 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 1 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 2 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 2',
    direction: 'expense',
    amount: 100,
  },
]

const user2Transactions: Partial<ITransaction>[] = [
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 2 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 3 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 4 - Transaction 13',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 2',
    direction: 'expense',
    amount: 100,
  },
]

const user3Transactions: Partial<ITransaction>[] = [
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 3 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 5 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 6 - Transaction 13',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 2',
    direction: 'expense',
    amount: 100,
  },
]

const user4Transactions: Partial<ITransaction>[] = [
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 4 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 7 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 8 - Transaction 13',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 2',
    direction: 'expense',
    amount: 100,
  },
]

const user5Transactions: Partial<ITransaction>[] = [
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'installment',
    description: 'Installment 5 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 2',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 3',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 4',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 5',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 6',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 7',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 8',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 9',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 10',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 11',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 9 - Transaction 12',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'subscription',
    description: 'Subscription 10 - Transaction 13',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 1',
    direction: 'expense',
    amount: 100,
  },
  {
    type: 'single',
    description: 'Single 2',
    direction: 'expense',
    amount: 100,
  },
]

function getRandomBrand(): Partial<ITransactionBrand> {
  return transactionBrands[Math.floor(Math.random() * transactionBrands.length)]
}

function getRandomCategory(): Partial<ITransactionCategory> {
  return transactionCategories[
    Math.floor(Math.random() * transactionCategories.length)
  ]
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Generate a date between start and end date
function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

// Generate incrementing dates for a series of transactions
function generateDateSeries(
  startDate: Date,
  numTransactions: number,
  frequencyDays: number,
): Date[] {
  const dates: Date[] = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < numTransactions; i++) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + frequencyDays)
  }

  return dates
}

// Add realistic details to transactions
function enrichTransactionData(
  transactions: Partial<ITransaction>[],
): Partial<ITransaction>[] {
  return transactions.map(transaction => {
    // Add random brand and category
    const brand = getRandomBrand() as ITransactionBrand
    const category = getRandomCategory() as ITransactionCategory

    // Add some randomization to amounts (±10%) for more realistic data
    const originalAmount = transaction.amount || 0
    const randomizedAmount = originalAmount * (0.9 + Math.random() * 0.2)

    // Generate transaction date
    const transactionDate = transaction.dueDate || new Date()

    return {
      ...transaction,
      brand,
      category,
      amount: Math.round(randomizedAmount * 100) / 100,
      date: transactionDate,
      transactionStatus: 'paid',
      currency: 'USD',
    }
  })
}

// Link transactions to installments
function linkInstallmentTransactions(
  transactions: Partial<ITransaction>[],
  installment: Partial<IInstallment>,
  userId: string,
): Partial<ITransaction>[] {
  const startDate = installment.startDate || new Date()
  const frequencyDays = installment.frequency === 'monthly' ? 30 : 7
  const dates = generateDateSeries(
    startDate,
    transactions.length,
    frequencyDays,
  )

  return transactions.map((transaction, index) => ({
    ...transaction,
    date: dates[index],
    userId,
    installmentId: installment.id,
  }))
}

// Link transactions to subscriptions
function linkSubscriptionTransactions(
  transactions: Partial<ITransaction>[],
  subscription: Partial<ISubscription>,
  userId: string,
): Partial<ITransaction>[] {
  const startDate = subscription.startDate || new Date()
  const frequencyDays = subscription.frequency === 'monthly' ? 30 : 7
  const dates = generateDateSeries(
    startDate,
    transactions.length,
    frequencyDays,
  )

  return transactions.map((transaction, index) => ({
    ...transaction,
    date: dates[index],
    userId,
    subscriptionId: subscription.id,
  }))
}

// Process transactions for a user
function processUserTransactions(
  userTransactions: Partial<ITransaction>[],
  userInstallments: Partial<IInstallment>[],
  userSubscriptions: Partial<ISubscription>[],
  userId: string,
): Partial<ITransaction>[] {
  // Group by type
  const installmentTransactions = userTransactions.filter(
    t => t.type === 'installment',
  )
  const subscriptionTransactions = userTransactions.filter(
    t => t.type === 'subscription',
  )
  const singleTransactions = userTransactions.filter(t => t.type === 'single')

  // Link transactions to respective entities
  let processedTransactions: Partial<ITransaction>[] = []

  // Process installment transactions
  userInstallments.forEach((installment, index) => {
    const installmentTxs = installmentTransactions.filter(t =>
      t.description?.includes(`Installment ${index + 1}`),
    )
    if (installmentTxs.length > 0) {
      processedTransactions = [
        ...processedTransactions,
        ...linkInstallmentTransactions(installmentTxs, installment, userId),
      ]
    }
  })

  // Process subscription transactions
  userSubscriptions.forEach((subscription, index) => {
    const subscriptionTxs = subscriptionTransactions.filter(t =>
      t.description?.includes(`Subscription ${index + 1}`),
    )
    if (subscriptionTxs.length > 0) {
      processedTransactions = [
        ...processedTransactions,
        ...linkSubscriptionTransactions(subscriptionTxs, subscription, userId),
      ]
    }
  })

  // Process single transactions with random dates in the last 3 months
  const now = new Date()
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(now.getMonth() - 3)

  const processedSingleTransactions = singleTransactions.map(transaction => ({
    ...transaction,
    userId,
    date: getRandomDate(threeMonthsAgo, now),
  }))

  processedTransactions = [
    ...processedTransactions,
    ...processedSingleTransactions,
  ]

  // Enrich all transactions with additional data
  return enrichTransactionData(processedTransactions)
}

// ================================
// FEED GENERATION
// ================================

// Assign IDs to entities (in a real application, these would come from the database)
function assignIds<T>(entities: Partial<T>[]): Partial<T>[] {
  return entities.map((entity, index) => ({
    ...entity,
    id: `${index + 1}`,
  }))
}

// Generate feed data
export function generateTransactionFeed() {
  // Assign IDs to all entities
  const users = assignIds(sampleNormalUsers) as IUser[]
  const brands = assignIds(transactionBrands) as ITransactionBrand[]
  const categories = assignIds(transactionCategories) as ITransactionCategory[]
  const allInstallments = assignIds(installments) as IInstallment[]
  const allSubscriptions = assignIds(subscriptions) as ISubscription[]

  // Assign users to their data
  const userData = [
    {
      user: users[0],
      transactions: user1Transactions,
      installments: [allInstallments[0]],
      subscriptions: [allSubscriptions[0], allSubscriptions[1]],
    },
    {
      user: users[1],
      transactions: user2Transactions,
      installments: [allInstallments[1]],
      subscriptions: [allSubscriptions[2], allSubscriptions[3]],
    },
    {
      user: users[2],
      transactions: user3Transactions,
      installments: [allInstallments[2]],
      subscriptions: [allSubscriptions[4], allSubscriptions[5]],
    },
    {
      user: users[3],
      transactions: user4Transactions,
      installments: [allInstallments[3]],
      subscriptions: [allSubscriptions[6], allSubscriptions[7]],
    },
    {
      user: users[4],
      transactions: user5Transactions,
      installments: [allInstallments[4]],
      subscriptions: [allSubscriptions[8], allSubscriptions[9]],
    },
  ]

  // Process all user transactions
  const processedTransactions = userData.flatMap(data =>
    processUserTransactions(
      data.transactions,
      data.installments,
      data.subscriptions,
      data.user.id as string,
    ),
  )

  // Return all feed data
  return {
    users,
    brands,
    categories,
    installments: allInstallments,
    subscriptions: allSubscriptions,
    transactions: processedTransactions,
  }
}

export async function transactionFeed() {
  try {
    generateTransactionFeed()
    // Add your transaction database insertion logic here
    logger.info('Transaction seed process completed.')
  } catch (error) {
    logger.error('Transaction seed process failed:', error)
    throw error
  }
}
