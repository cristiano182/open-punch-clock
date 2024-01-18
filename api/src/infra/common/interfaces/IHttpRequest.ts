import { FastifyRequestType } from 'fastify/types/type-provider'

export type IHeaders = {
  authorization: string
}

export type IParamsDefault = {
  id: string
}

type IRaw = {
  method: string
  url: string
}

export interface MyRequest<IBody = unknown, IParams = unknown, IQuery = unknown> extends FastifyRequestType<
  IParams,
  IQuery,
  IHeaders,
  IBody
>{
  raw: IRaw,
}
