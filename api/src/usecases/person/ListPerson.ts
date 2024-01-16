import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'
import { IListPerson, IPerson, IPersonRepo } from '@domain/person'

export type IListJobUseCaseParams = IListPerson
export type IListJobUseCaseResponse = IPagination<IPerson>

@injectable()
export default class ListJob implements IUseCase<IListJobUseCaseParams, IListJobUseCaseResponse> {
  constructor(@inject(TYPES.PersonRepository) private personRepo: IPersonRepo) {}

  async execute(params: IListJobUseCaseParams): Promise<IListJobUseCaseResponse> {
    return this.personRepo.search(params)
  }
}
