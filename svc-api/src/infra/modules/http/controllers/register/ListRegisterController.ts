import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { IParamsDefault, MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListRegisterSchema } from './schemas/ListRegisterSchema'
import { IListRegister } from '@domain/register'
import ListRegister from '@usecases/register/ListRegister'

@injectable()
export default class ListRegisterController implements IController {
  constructor(
    @inject(TYPES.ListRegister) private listRegister: ListRegister,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListRegisterSchema,
      async (request: MyRequest<unknown, unknown, IListRegister>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listRegister.execute(query)
        reply.send(companies)
      },
    )
  }
}
