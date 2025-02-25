import 'zod-openapi/extend'
import { z } from 'zod'

import { OPENAPI_METADATA_KEY } from '@/constants'
import {
  BaseController,
  OpenApiMethodMetadata,
} from '@/controller/base.controller'

function createMethodDecorator(method: string) {
  return function (path: string) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      const existingMetadata: OpenApiMethodMetadata = Reflect.getMetadata(
        OPENAPI_METADATA_KEY,
        target,
        propertyKey,
      ) || {
        method: '',
        path: '',
        responses: {},
        requestBody: undefined,
        operation: undefined,
        parameters: [],
      }

      const mergedMetadata: OpenApiMethodMetadata = {
        ...existingMetadata,
        method,
        path,
      }

      Reflect.defineMetadata(
        OPENAPI_METADATA_KEY,
        mergedMetadata,
        target,
        propertyKey,
      )
      return descriptor
    }
  }
}

const Get = createMethodDecorator('get')
const Post = createMethodDecorator('post')
const Put = createMethodDecorator('put')
const Patch = createMethodDecorator('patch')
const Delete = createMethodDecorator('delete')

function ApiParam(
  location: 'query' | 'header' | 'path' | 'cookie',
  name: string,
  schema: z.ZodSchema,
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    // Get existing metadata
    const existingMetadata: OpenApiMethodMetadata = Reflect.getMetadata(
      OPENAPI_METADATA_KEY,
      target,
      propertyKey,
    ) || {
      method: '',
      path: '',
      responses: {},
      requestBody: undefined,
      operation: undefined,
      parameters: [],
    }

    // Ensure parameters is an array
    if (!Array.isArray(existingMetadata.parameters)) {
      existingMetadata.parameters = []
    }

    // Determine if the schema is optional by checking if it accepts undefined
    const isOptional = schema.safeParse(undefined).success
    // Path parameters are always required; for others, required if schema is not optional
    const required = location === 'path' || !isOptional

    const openApiMetadata = schema._def.zodOpenApi
    const description = openApiMetadata?.openapi?.description || ''
    const example = openApiMetadata?.openapi?.example

    // Create parameter object according to OpenAPI spec
    const parameter = {
      name,
      in: location,
      description,
      required,
      schema,
      ...(example !== undefined && { example }),
    }

    // Add parameter to metadata
    existingMetadata.parameters.push(parameter)

    // Update metadata
    Reflect.defineMetadata(
      OPENAPI_METADATA_KEY,
      existingMetadata,
      target,
      propertyKey,
    )

    return descriptor
  }
}

function ApiOperation(config: {
  operationId: string
  description: string
  tags: string[]
  summary: string
}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const existingMetadata: OpenApiMethodMetadata = Reflect.getMetadata(
      OPENAPI_METADATA_KEY,
      target,
      propertyKey,
    ) || {
      method: '',
      path: '',
      responses: {},
      requestBody: undefined,
      operation: undefined,
      parameters: [],
    }

    existingMetadata.operation = config
    Reflect.defineMetadata(
      OPENAPI_METADATA_KEY,
      existingMetadata,
      target,
      propertyKey,
    )
    return descriptor
  }
}

function ApiBody(required: boolean, schema: z.ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const existingMetadata: OpenApiMethodMetadata = Reflect.getMetadata(
      OPENAPI_METADATA_KEY,
      target,
      propertyKey,
    ) || {
      method: '',
      path: '',
      responses: {},
      requestBody: undefined,
      operation: undefined,
      parameters: [],
    }

    existingMetadata.requestBody = {
      required,
      content: { 'application/json': { schema } },
    }

    Reflect.defineMetadata(
      OPENAPI_METADATA_KEY,
      existingMetadata,
      target,
      propertyKey,
    )
    return descriptor
  }
}

function DApiResponse(
  statusCode: number,
  description: string,
  schema: z.ZodSchema,
) {
  return function (
    target: BaseController,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const metadata: OpenApiMethodMetadata = Reflect.getMetadata(
      OPENAPI_METADATA_KEY,
      target,
      propertyKey,
    ) || {
      method: '',
      path: '',
      responses: {},
      requestBody: undefined,
      operation: undefined,
      parameters: [],
    }

    metadata.responses[statusCode] = {
      description,
      content: {
        'application/json': { schema },
      },
    }

    Reflect.defineMetadata(OPENAPI_METADATA_KEY, metadata, target, propertyKey)
    return descriptor
  }
}

export {
  ApiBody,
  ApiOperation,
  ApiParam,
  DApiResponse,
  Delete,
  Get,
  Patch,
  Post,
  Put,
}
