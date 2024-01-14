import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { IService, IServiceRepo, IListService } from '@domain/service/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListServiceUseCaseParams = IListService
export type IListServiceUseCaseResponse = IPagination<IService>

@injectable()
export default class ListService implements IUseCase<IListServiceUseCaseParams, IListServiceUseCaseResponse> {
  constructor(@inject(TYPES.ServiceRepository) private serviceRepo: IServiceRepo) {}

  async execute(params: IListServiceUseCaseParams): Promise<IListServiceUseCaseResponse> {
    return this.serviceRepo.search(params)
  }
}
