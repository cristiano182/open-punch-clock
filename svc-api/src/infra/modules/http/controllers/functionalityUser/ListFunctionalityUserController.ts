import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import {  MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListFunctionalityUserSchema } from './schemas/ListFunctionalityUserSchema'
import { IListFunctionalityUser } from '@domain/functionalityUser'
import ListFunctionalityUser from '@usecases/functionalityUser/ListFunctionalityUser'

@injectable()
export default class ListFunctionalityUserController implements IController {
  constructor(
    @inject(TYPES.ListFunctionalityUser) private listFunctionalityUser: ListFunctionalityUser,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListFunctionalityUserSchema,
      async (request: MyRequest<unknown, unknown, IListFunctionalityUser>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listFunctionalityUser.execute(query)
        reply.send(companies)
      },
    )
  }
}
