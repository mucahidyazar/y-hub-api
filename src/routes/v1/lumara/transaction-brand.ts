import express from 'express'

import { ROUTES } from '../../../constants'
import {
  transactionBrandCreate,
  transactionBrandDelete,
  transactionBrandGet,
  transactionBrandList,
  transactionBrandUpdate
} from '../../../controller/lumara/transaction-brand'
import { tryCatch } from '../../../utils'

const router = express.Router()

router.post(ROUTES.v1.lumara.transactionBrand.create, tryCatch(transactionBrandCreate))
router.delete(ROUTES.v1.lumara.transactionBrand.delete, tryCatch(transactionBrandDelete))
router.get(ROUTES.v1.lumara.transactionBrand.get, tryCatch(transactionBrandGet))
router.get(ROUTES.v1.lumara.transactionBrand.list, tryCatch(transactionBrandList))
router.put(ROUTES.v1.lumara.transactionBrand.update, tryCatch(transactionBrandUpdate))

export { router as transactionBrandRouter }
