import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import User from '../../domain/user/User'
import { ICreateUser, IUser, IUserRepo } from '../../domain/user'
import { IClientRepo } from '@domain/client'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { ICompanyRepo } from '@domain/company'

export type ICreateUserUseCaseParams = ICreateUser
export type ICreateUserUseCaseResponse = IUser

@injectable()
export default class CreateUser implements IUseCase<ICreateUserUseCaseParams, ICreateUserUseCaseResponse> {
  constructor(
    @inject(TYPES.UserRepository) private userRepo: IUserRepo,
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
  ) {}

  async execute(props: ICreateUserUseCaseParams): Promise<ICreateUserUseCaseResponse> {
    const company = await this.companyRepo.findById(String(props.company))

    if (!company) throw new Error()

    const user = User.create({ ...props, company })
    return this.userRepo.create(user.toJson())
  }
}
