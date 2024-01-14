import 'reflect-metadata'

import TYPES from '../../../../common/types/Types'
import { FastifyInstance, FastifyReply } from 'fastify'
import { inject, injectable } from 'inversify'
import { IController } from '../../../../common/interfaces/IController'
import { CreateJobSchema } from './schemas/CreateJobSchema'
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../common/interfaces/IHttpRequest'
import { ICreateJob } from '@domain/job'
import CreateJob from '@usecases/job/CreateJob'

@injectable()
export default class CreateJobController implements IController {
  constructor(
    @inject(TYPES.CreateJob) private createJob: CreateJob,
    @inject(TYPES.Authentication) private authentication: IAuthentication,
  ) {}

  async execute(httpInstance: any): Promise<FastifyInstance> {
    return httpInstance.post(
      '/',
      CreateJobSchema,
      async (request: MyRequest<ICreateJob>, reply: FastifyReply) => {
        await this.authentication.execute(request)
        const params = request.body
        reply.code(201).send(await this.createJob.execute(params))
      },
    )
  }
}
