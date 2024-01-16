import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { IParamsDefault, MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListServiceSchema } from './schemas/ListServiceSchema'
import { IListService } from '@domain/service'
import ListService from '@usecases/service/ListService'

@injectable()
export default class ListServiceController implements IController {
  constructor(
    @inject(TYPES.ListService) private listService: ListService,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListServiceSchema,
      async (request: MyRequest<unknown, unknown, IListService>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listService.execute(query)
        reply.send(companies)
      },
    )
  }
}
