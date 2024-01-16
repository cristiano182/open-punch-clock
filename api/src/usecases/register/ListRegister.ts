import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { IListRegister, IRegister, IRegisterRepo } from '@domain/register/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListRegisterUseCaseParams = IListRegister
export type IListRegisterUseCaseResponse = IPagination<IRegister>

@injectable()
export default class ListRegister implements IUseCase<IListRegisterUseCaseParams, IListRegisterUseCaseResponse> {
  constructor(@inject(TYPES.RegisterRepository) private registerRepo: IRegisterRepo) {}

  async execute(params: IListRegisterUseCaseParams): Promise<IListRegisterUseCaseResponse> {
    return this.registerRepo.search(params)
  }
}
