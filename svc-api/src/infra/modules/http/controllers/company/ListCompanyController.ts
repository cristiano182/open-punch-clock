import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import ListCompany from '../../../../../usecases/company/ListCompany'
import { ListCompanySchema } from './schemas/ListCompanySchema'
import { IListCompany } from '@domain/company/interfaces/IListCompany'

@injectable()
export default class ListCompanyController implements IController {
  constructor(
    @inject(TYPES.ListCompany) private listCompany: ListCompany,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListCompanySchema,
      async (request: MyRequest<unknown, unknown, IListCompany>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listCompany.execute(query)
        reply.send(companies)
      },
    )
  }
}
