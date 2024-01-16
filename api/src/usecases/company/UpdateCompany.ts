import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import TYPES from '../../infra/common/types/Types'
import Company from '../../domain/company/Company'
import { IUpdateCompany, ICompanyRepo } from '../../domain/company'
import IUseCase from '../../infra/common/interfaces/IUseCase'

@injectable()
export default class UpdateCompany implements IUseCase<IUpdateCompany, void> {
  constructor(@inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo) {}

  async execute(params: IUpdateCompany): Promise<void> {
    const companyFromRepo = await this.companyRepo.findById(String(params.id))

    if (!companyFromRepo) {
      throw new Error()
    }

    const entity = Company.create(companyFromRepo).update(params).toJson()
    ;(await this.companyRepo.update(entity.id, entity)) as any
  }
}
