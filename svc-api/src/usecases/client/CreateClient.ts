import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import Client from '../../domain/client/Client'
import { ICreateClient, IClient, IClientRepo } from '../../domain/client'
import IUseCase from '@infra/common/interfaces/IUseCase'

@injectable()
export default class CreateClient implements IUseCase<ICreateClient, IClient> {
  constructor(@inject(TYPES.ClientRepository) private clientRepo: IClientRepo) {}

  async execute(props: ICreateClient): Promise<IClient> {
    const client = Client.create(props)
    return this.clientRepo.create(client.toJson())
  }
}
