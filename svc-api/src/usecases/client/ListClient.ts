import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { IClient, IClientRepo, IListClient } from '@domain/client/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListClientUseCaseParams = IListClient
export type IListClientUseCaseResponse = IPagination<IClient>

@injectable()
export default class ListClient implements IUseCase<IListClientUseCaseParams, IListClientUseCaseResponse> {
  constructor(@inject(TYPES.ClientRepository) private clientRepo: IClientRepo) {}

  async execute(params: IListClientUseCaseParams): Promise<IListClientUseCaseResponse> {
    return this.clientRepo.search(params)
  }
}
