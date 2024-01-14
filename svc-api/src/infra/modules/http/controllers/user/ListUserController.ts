import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { IParamsDefault, MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListUserSchema } from './schemas/ListUserSchema'
import { IListUser } from '@domain/user'
import ListUser from '@usecases/user/ListUser'

@injectable()
export default class ListUserController implements IController {
  constructor(
    @inject(TYPES.ListUser) private listUser: ListUser,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListUserSchema,
      async (request: MyRequest<unknown, unknown, IListUser>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listUser.execute(query)
        reply.send(companies)
      },
    )
  }
}
