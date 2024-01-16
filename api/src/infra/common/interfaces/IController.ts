import { FastifyInstance } from 'fastify'

export interface IController {
  execute: (httpInstance: any) => Promise<FastifyInstance>
}
