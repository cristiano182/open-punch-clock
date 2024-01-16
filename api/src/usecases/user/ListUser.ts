import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'
import { IListUser, IUser, IUserRepo } from '@domain/user/interfaces'

export type IListUserUseCaseParams = IListUser
export type IListUserUseCaseResponse = IPagination<IUser>

@injectable()
export default class ListUser implements IUseCase<IListUserUseCaseParams, IListUserUseCaseResponse> {
  constructor(@inject(TYPES.UserRepository) private userRepo: IUserRepo) {}

  async execute(params: IListUserUseCaseParams): Promise<IListUserUseCaseResponse> {
    return this.userRepo.search(params)
  }
}
