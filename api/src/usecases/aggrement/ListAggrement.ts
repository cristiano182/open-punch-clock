import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { IAggrement, IAggrementRepo, IListAggrement } from '@domain/aggrement/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListAggrementUseCaseParams = IListAggrement
export type IListAggrementUseCaseResponse = IPagination<IAggrement>

@injectable()
export default class ListAggrement implements IUseCase<IListAggrementUseCaseParams, IListAggrementUseCaseResponse> {
  constructor(@inject(TYPES.AggrementRepository) private aggrementRepo: IAggrementRepo) {}

  async execute(params: IListAggrementUseCaseParams): Promise<IListAggrementUseCaseResponse> {
    return this.aggrementRepo.search(params)
  }
}
