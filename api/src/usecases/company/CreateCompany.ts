import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { ICompany, ICompanyRepo, ICreateCompany } from '@domain/company/interfaces'
import TYPES from '../../infra/common/types/Types'
import Company from '../../domain/company/Company'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { isEmpty } from 'lodash'

@injectable()
export default class CreateCompany implements IUseCase<ICreateCompany, ICompany> {
  constructor(@inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo) {}

  async execute(props: ICreateCompany): Promise<ICompany> {
    const { name, document } = props
    const alreadyExistCompany = await this.companyRepo.search({ name, document })
    if(!isEmpty(alreadyExistCompany.data)) throw new Error()
    const company = Company.create(props)
    return this.companyRepo.create(company.toJson())
  }
}
