import 'reflect-metadata'
import { IUpdateCompany } from '@domain/company'
import { IController } from '@infra/common/interfaces/IController'
import { IParamsDefault, MyRequest } from '@infra/common/interfaces/IHttpRequest'
import TYPES from '@infra/common/types/Types'
import { IAuthentication } from '@infra/modules/authentication/authentication'
import UpdateCompany from '@usecases/company/UpdateCompany'
import { FastifyInstance, FastifyReply } from 'fastify'
import { injectable, inject } from 'inversify'
import { UpdateCompanySchema } from './schemas/UpdateCompanySchema'

@injectable()
export default class UpdateCompanyController implements IController {
  constructor(
    @inject(TYPES.UpdateCompany) private updateCompany: UpdateCompany,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.put(
      '/:id',
      UpdateCompanySchema,
      async (request: MyRequest<IUpdateCompany, IParamsDefault>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = { ...request.body, ...request.params }
        const result = await this.updateCompany.execute(params)
        reply.status(204).send(result)
      },
    )
  }
}
