import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateClientSchema } from './schemas/CreateClientSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateClient } from '@domain/client'
import CreateClient from '@usecases/client/CreateClient'

@injectable()
export default class CreateClientController implements IController {
  constructor(
    @inject(TYPES.CreateClient) private createClient: CreateClient,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateClientSchema,
      async (request: MyRequest<ICreateClient>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createClient.execute(params))
      },
    )
  }
}
