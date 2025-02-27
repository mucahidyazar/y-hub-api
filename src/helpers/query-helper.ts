import { Query } from 'mongoose'
import { z } from 'zod'

import { PaginationRequestParameters } from '@/requestModel'

type PaginationMetadata = {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

type QueryHelperResult = {
  metadata: PaginationMetadata | undefined
}

type QueryHelperArgs = {
  queryStrings: z.infer<typeof PaginationRequestParameters>
  query: Query<any, any>
}

export function getPaginationMetadata(
  limit: number,
  page: number,
  totalItems: number,
): PaginationMetadata {
  const totalPages = Math.ceil(totalItems / limit)

  return {
    page,
    limit,
    totalItems,
    totalPages,
    currentPage: page,
    hasNextPage: totalItems > page * limit,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  }
}

async function handlePagination(
  query: Query<any, any>,
  options: z.infer<typeof PaginationRequestParameters>,
): Promise<PaginationMetadata | undefined> {
  const page = options.page
  const limit = options.limit
  const skip = (page - 1) * limit

  query.skip(skip).limit(limit)

  return getPaginationMetadata(limit, page, await query.clone().countDocuments())
}

async function queryHelper({
  queryStrings,
  query,
}: QueryHelperArgs): Promise<QueryHelperResult> {
  const metadata = await handlePagination(query, queryStrings)

  return { metadata }
}

export { queryHelper }
