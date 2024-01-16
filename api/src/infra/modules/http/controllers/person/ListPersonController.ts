import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { IParamsDefault, MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListPersonSchema } from './schemas/ListPersonSchema'
import { IListPerson } from '@domain/person'
import ListPerson from '@usecases/person/ListPerson'

@injectable()
export default class ListPersonController implements IController {
  constructor(
    @inject(TYPES.ListPerson) private listPerson: ListPerson,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListPersonSchema,
      async (request: MyRequest<unknown, unknown, IListPerson>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listPerson.execute(query)
        reply.send(companies)
      },
    )
  }
}
