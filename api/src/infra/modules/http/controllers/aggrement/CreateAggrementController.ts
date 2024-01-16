import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateAggrementSchema } from './schemas/CreateAggrementSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateAggrement } from '@domain/aggrement'
import CreateAggrement from '@usecases/aggrement/CreateAggrement'

@injectable()
export default class CreateAggrementController implements IController {
  constructor(
    @inject(TYPES.CreateAggrement) private createAggrement: CreateAggrement,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateAggrementSchema,
      async (request: MyRequest<ICreateAggrement>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createAggrement.execute(params))
      },
    )
  }
}
