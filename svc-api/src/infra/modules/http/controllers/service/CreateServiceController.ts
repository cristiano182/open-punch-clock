import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateServiceSchema } from './schemas/CreateServiceSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateService } from '@domain/service'
import CreateService from '@usecases/service/CreateService'

@injectable()
export default class CreateServiceController implements IController {
  constructor(
    @inject(TYPES.CreateService) private createService: CreateService,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateServiceSchema,
      async (request: MyRequest<ICreateService>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createService.execute(params))
      },
    )
  }
}
