import { Request, Response } from 'express'

import { Calculation } from '@/model/calculation'
import { CustomError } from '@/errors/custom-error'
import { ApiResponse } from '@/utils'

async function calculationCreate(req: Request, res: Response) {
  const newCalculation = new Calculation({
    ...req.body,
    user: req.user._id,
  })

  const data = await newCalculation.save()

  return res.response({
    statusCode: 201,
    apiResponse: ApiResponse.success(data),
  })
}

async function calculationList(req: Request, res: Response) {
  const { populateFields: _populateFields, ...queries } = req.query

  const data = await Calculation.find({
    user: req.user._id,
    ...queries,
  })

  return res.response({
    statusCode: 200,
    apiResponse: ApiResponse.success(data),
  })
}

async function calculationGet(req: Request, res: Response) {
  const data = await Calculation.findById(req.params.id)
  if (!data) {
    throw new CustomError('Calculation not found', 404)
  }

  return res.response({
    statusCode: 200,
    apiResponse: ApiResponse.success(data),
  })
}

async function calculationUpdate(req: Request, res: Response) {
  const data = await Calculation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  if (!data) {
    throw new CustomError('Calculation not found', 404)
  }

  return res.response({
    statusCode: 200,
    apiResponse: ApiResponse.success(data),
  })
}

async function calculationDelete(req: Request, res: Response) {
  const data = await Calculation.findByIdAndDelete(req.params.id)
  if (!data) {
    throw new CustomError('Calculation not found', 404)
  }

  return res.response({
    statusCode: 200,
    apiResponse: ApiResponse.success(null),
  })
}

export {
  calculationCreate,
  calculationDelete,
  calculationGet,
  calculationList,
  calculationUpdate,
}
