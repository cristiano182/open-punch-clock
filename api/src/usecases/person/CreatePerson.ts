import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import Person from '../../domain/person/Person'
import { ICreatePerson, IPerson, IPersonRepo } from '../../domain/person'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { ICompanyRepo } from '@domain/company'
import { IUser } from '@domain/user'
import jwt from "jsonwebtoken"
import SECRETS  from '../../infra/server/env'

export interface ICreatePersonUseCaseParams extends ICreatePerson {user: IUser}
export interface ICreatePersonUseCaseResponse  extends Omit<IPerson, 'password'> {
  password?: string
}

@injectable()
export default class CreatePerson implements IUseCase<ICreatePersonUseCaseParams, ICreatePersonUseCaseResponse> {
  constructor(
    @inject(TYPES.PersonRepository) private personRepo: IPersonRepo,
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
  ) {}

  async execute(props: ICreatePersonUseCaseParams): Promise<ICreatePersonUseCaseResponse> {
    const company = await this.companyRepo.findById(String(props.user.company.id))
    if (!company) throw new Error()

    props.company =  company

    const passwordEncoded =  jwt.sign(props.password, SECRETS.JWT_SECRET)
    props.password = passwordEncoded

    let person = Person.create(props).toJson()
    await this.personRepo.create(person)
    const response: ICreatePersonUseCaseResponse = {...person}
    delete response.password
    return response
  }
}
