import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { IFunctionalityUser, IFunctionalityUserRepo, IListFunctionalityUser } from '@domain/functionalityUser/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListFunctionalityUserUseCaseParams = IListFunctionalityUser
export type IListFunctionalityUserUseCaseResponse = IPagination<IFunctionalityUser>

@injectable()
export default class ListFunctionalityUser implements IUseCase<IListFunctionalityUserUseCaseParams, IListFunctionalityUserUseCaseResponse> {
  constructor(@inject(TYPES.FunctionalityUserRepository) private functionalityUserRepo: IFunctionalityUserRepo) {}

  async execute(params: IListFunctionalityUserUseCaseParams): Promise<IListFunctionalityUserUseCaseResponse> {
    return this.functionalityUserRepo.search(params)
  }
}
