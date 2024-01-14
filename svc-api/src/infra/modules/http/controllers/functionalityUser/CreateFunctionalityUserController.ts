import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateFunctionalityUserSchema } from './schemas/CreateFunctionalityUserSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateFunctionalityUser } from '@domain/functionalityUser'
import CreateFunctionalityUser from '@usecases/functionalityUser/CreateFunctionalityUser'

@injectable()
export default class CreateFunctionalityUserController implements IController {
  constructor(
    @inject(TYPES.CreateFunctionalityUser) private createFunctionalityUser: CreateFunctionalityUser,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateFunctionalityUserSchema,
      async (request: MyRequest<ICreateFunctionalityUser>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createFunctionalityUser.execute(params))
      },
    )
  }
}
