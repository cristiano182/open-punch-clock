import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateUserSchema } from './schemas/CreateUserSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateUser } from '@domain/user'
import CreateUser from '@usecases/user/CreateUser'

@injectable()
export default class CreateUserController implements IController {
  constructor(
    @inject(TYPES.CreateUser) private createUser: CreateUser,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post('/', CreateUserSchema, async (request: MyRequest<ICreateUser>, reply: FastifyReply) => {
      await this.authentication.execute(request)
      const params = request.body
      reply.code(201).send(await this.createUser.execute(params))
    })
  }
}
