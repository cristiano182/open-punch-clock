import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { IParamsDefault, MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListClientSchema } from './schemas/ListClientSchema'
import { IListClient } from '@domain/client'
import ListClient from '@usecases/client/ListClient'

@injectable()
export default class ListClientController implements IController {
  constructor(
    @inject(TYPES.ListClient) private listClient: ListClient,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListClientSchema,
      async (request: MyRequest<unknown, unknown, IListClient>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listClient.execute(query)
        reply.send(companies)
      },
    )
  }
}
