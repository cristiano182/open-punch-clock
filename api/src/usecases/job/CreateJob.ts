import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { ICreateJob, IJob, IJobRepo } from '@domain/job'
import { IServiceRepo } from '@domain/service'
import Job from '@domain/job/Job'

export type ICreateJobUseCaseParams = ICreateJob
export type ICreateJobUseCaseResponse = IJob

@injectable()
export default class CreateJob implements IUseCase<ICreateJobUseCaseParams, ICreateJobUseCaseResponse> {
  constructor(
    @inject(TYPES.JobRepository) private jobRepo: IJobRepo,
    @inject(TYPES.ServiceRepository) private serviceRepo: IServiceRepo,
  ) {}

  async execute(props: ICreateJobUseCaseParams): Promise<ICreateJobUseCaseResponse> {
    const service = await this.serviceRepo.findById(String(props.service))

    if (!service) throw new Error()

    const job = Job.create({ ...props, service })
    return this.jobRepo.create(job.toJson())
  }
}
