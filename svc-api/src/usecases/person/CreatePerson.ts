import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import Person from '../../domain/person/Person'
import { ICreatePerson, IPerson, IPersonRepo } from '../../domain/person'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { ICompanyRepo } from '@domain/company'

export type ICreatePersonUseCaseParams = ICreatePerson
export type ICreatePersonUseCaseResponse = IPerson

@injectable()
export default class CreatePerson implements IUseCase<ICreatePersonUseCaseParams, ICreatePersonUseCaseResponse> {
  constructor(
    @inject(TYPES.PersonRepository) private personRepo: IPersonRepo,
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
  ) {}

  async execute(props: ICreatePersonUseCaseParams): Promise<ICreatePersonUseCaseResponse> {
    const company = await this.companyRepo.findById(String(props.company))

    if (!company) throw new Error()

    const person = Person.create({ ...props, company })
    return this.personRepo.create(person.toJson())
  }
}
