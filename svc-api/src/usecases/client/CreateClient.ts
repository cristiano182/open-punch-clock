import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import Client from '../../domain/client/Client'
import { ICreateClient, IClient, IClientRepo } from '../../domain/client'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { ICompanyRepo } from '@domain/company'

@injectable()
export default class CreateClient implements IUseCase<ICreateClient, IClient> {
  constructor(
    @inject(TYPES.ClientRepository) private clientRepo: IClientRepo,
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
  ) {}

  async execute(props: ICreateClient): Promise<IClient> {
    const company = await this.companyRepo.findById(String(props.company))

    if (!company) throw new Error()

    const client = Client.create({ ...props, company })
    return this.clientRepo.create(client.toJson())
  }
}
