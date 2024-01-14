import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { IAuthentication } from '../../../authentication/authentication'
import { IParamsDefault, MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ListJobSchema } from './schemas/ListJobSchema'
import { IListJob } from '@domain/job'
import ListJob from '@usecases/job/ListJob'

@injectable()
export default class ListJobController implements IController {
  constructor(
    @inject(TYPES.ListJob) private listJob: ListJob,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.get(
      '/',
      ListJobSchema,
      async (request: MyRequest<unknown, unknown, IListJob>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const query = request.query
        const companies = await this.listJob.execute(query)
        reply.send(companies)
      },
    )
  }
}
