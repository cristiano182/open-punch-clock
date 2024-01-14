import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListAggrementSchema } from './schemas/ListAggrementSchema'
import { IListAggrement } from '@domain/aggrement'
import ListAggrement from '@usecases/aggrement/ListAggrement'

@injectable()
export default class ListAggrementController implements IController {
  constructor(
    @inject(TYPES.ListAggrement) private listAggrement: ListAggrement,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListAggrementSchema,
      async (request: MyRequest<unknown, unknown, IListAggrement>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listAggrement.execute(query)
        reply.send(companies)
      },
    )
  }
}
