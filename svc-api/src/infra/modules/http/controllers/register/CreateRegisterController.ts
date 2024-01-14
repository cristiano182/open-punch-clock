import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateRegisterSchema } from './schemas/CreateRegisterSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateRegister } from '@domain/register'
import CreateRegister from '@usecases/register/CreateRegister'

@injectable()
export default class CreateRegisterController implements IController {
  constructor(
    @inject(TYPES.CreateRegister) private createRegister: CreateRegister,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateRegisterSchema,
      async (request: MyRequest<ICreateRegister>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createRegister.execute(params))
      },
    )
  }
}
