import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreatePersonSchema } from './schemas/CreatePersonSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreatePerson } from '@domain/person'
import CreatePerson from '@usecases/person/CreatePerson'

@injectable()
export default class CreatePersonController implements IController {
  constructor(
    @inject(TYPES.CreatePerson) private createPerson: CreatePerson,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreatePersonSchema,
      async (request: MyRequest<ICreatePerson>, reply: FastifyReply) => {
        const user =  await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createPerson.execute({...params, user}))
      },
    )
  }
}
