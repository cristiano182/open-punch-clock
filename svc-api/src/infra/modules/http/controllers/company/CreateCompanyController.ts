import { ICreateCompany } from '@domain/company'
import { IController } from '@infra/common/interfaces/IController'
import { MyRequest } from '@infra/common/interfaces/IHttpRequest'
import TYPES from '@infra/common/types/Types'
import { IAuthentication } from '@infra/modules/authentication/authentication'
import CreateCompany from '@usecases/company/CreateCompany'
import { FastifyInstance, FastifyReply } from 'fastify'
import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import { CreateCompanySchema } from './schemas/CreateCompanySchema'

@injectable()
export default class CreateCompanyController implements IController {
  constructor(
    @inject(TYPES.CreateCompany) private createCompany: CreateCompany,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateCompanySchema,
      async (request: MyRequest<ICreateCompany>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createCompany.execute(params))
      },
    )
  }
}
