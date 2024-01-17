import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { LoginSchema } from './schemas/LoginSchema'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import Login, { ILoginUseCaseParams } from '@usecases/login/Login'
import { IController } from '@infra/common/interfaces/IController'

@injectable()
export default class LoginController implements IController {
  constructor(
    @inject(TYPES.Login) private loginUsecase: Login,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post('/', LoginSchema, async (request: MyRequest<ILoginUseCaseParams>, reply: FastifyReply) => {
      const params = request.body
      reply.code(201).send(await this.loginUsecase.execute(params))
    })
  }
}
