import express from 'express'

import { ROUTES } from '../../../constants'
import {
  transactionCategoryCreate,
  transactionCategoryDelete,
  transactionCategoryGet,
  transactionCategoryList,
  transactionCategoryUpdate
} from '../../../controller/lumara/transaction-category'
import { tryCatch } from '../../../utils'

const router = express.Router()

router.post(ROUTES.v1.lumara.transactionCategory.create, tryCatch(transactionCategoryCreate))
router.delete(ROUTES.v1.lumara.transactionCategory.delete, tryCatch(transactionCategoryDelete))
router.get(ROUTES.v1.lumara.transactionCategory.get, tryCatch(transactionCategoryGet))
router.get(ROUTES.v1.lumara.transactionCategory.list, tryCatch(transactionCategoryList))
router.put(ROUTES.v1.lumara.transactionCategory.update, tryCatch(transactionCategoryUpdate))

export { router as transactionCategoryRouter }
