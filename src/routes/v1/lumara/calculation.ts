import express from 'express'

import { ROUTES } from '../../../constants'
import {
  calculationCreate,
  calculationDelete,
  calculationGet,
  calculationList,
  calculationUpdate
} from '../../../controller/lumara/calculation'
import { tryCatch } from '../../../utils'

const router = express.Router()

router.post(ROUTES.v1.lumara.calculation.create, tryCatch(calculationCreate))
router.delete(ROUTES.v1.lumara.calculation.delete, tryCatch(calculationDelete))
router.get(ROUTES.v1.lumara.calculation.get, tryCatch(calculationGet))
router.get(ROUTES.v1.lumara.calculation.list, tryCatch(calculationList))
router.put(ROUTES.v1.lumara.calculation.update, tryCatch(calculationUpdate))

export { router as calculationRouter }
