import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { ICompany, ICompanyRepo, IListCompany } from '@domain/company/interfaces'
import TYPES from '../../infra/common/types/Types'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { IPagination } from '@domain/interfaces'

export type IListCompanyUseCaseParams = IListCompany
export type IListCompanyUseCaseResponse = IPagination<ICompany>

@injectable()
export default class ListCompany implements IUseCase<IListCompanyUseCaseParams, IListCompanyUseCaseResponse> {
  constructor(@inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo) {}

  async execute(params: IListCompanyUseCaseParams): Promise<IListCompanyUseCaseResponse> {
    return this.companyRepo.search(params)
  }
}
