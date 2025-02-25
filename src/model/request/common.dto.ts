// we will write a type for the request parameters for pagination request

import 'zod-openapi/extend'
import { z } from 'zod'

const PageParameter = z.number().optional().default(1).openapi({
  description: 'The page number',
  example: 1,
  default: 1,
})

const LimitParameter = z.number().optional().default(12).openapi({
  description: 'The number of items per page',
  example: 12,
  default: 12,
})

const PaginationRequestParameters = z
  .object({
    page: PageParameter,
    limit: LimitParameter,
  })
  .openapi({
    description: 'The pagination request parameters',
    title: 'Pagination',
  })

export { LimitParameter, PageParameter, PaginationRequestParameters }
