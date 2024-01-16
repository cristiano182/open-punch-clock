import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { IJob, IJobRepo, IListJob } from '@domain/job/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListJobUseCaseParams = IListJob
export type IListJobUseCaseResponse = IPagination<IJob>

@injectable()
export default class ListJob implements IUseCase<IListJobUseCaseParams, IListJobUseCaseResponse> {
  constructor(@inject(TYPES.JobRepository) private jobRepo: IJobRepo) {}

  async execute(params: IListJobUseCaseParams): Promise<IListJobUseCaseResponse> {
    return this.jobRepo.search(params)
  }
}
