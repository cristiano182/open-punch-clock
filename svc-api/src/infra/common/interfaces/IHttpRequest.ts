import { FastifyRequestType } from 'fastify/types/type-provider'

export type IHeaders = {
  Authorization: string
}

export type MyRequest<IBody = unknown, IParams = unknown, IQuery = unknown> = FastifyRequestType<
  IParams,
  IQuery,
  IHeaders,
  IBody
>
