import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import { IUserRepo } from '../../domain/user'
import IUseCase from '../../infra/common/interfaces/IUseCase'
import { ICompanyRepo, CompanyPaymentStatusEnum } from '../../domain/company'
import jwt from "jsonwebtoken"
import SECRETS  from '../../infra/server/env'

export type ILoginUseCaseParams = { email: string, password: string }
export type ILoginUseCaseResponse = { token: string}

@injectable()
export default class Login implements IUseCase<ILoginUseCaseParams, ILoginUseCaseResponse> {
  constructor(
    @inject(TYPES.UserRepository) private userRepo: IUserRepo,
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
  ) {}

  async execute(props: ILoginUseCaseParams): Promise<ILoginUseCaseResponse> {
    const {email, password} = props
    const { data: user } = await this.userRepo.search({ email })
    if(!user[0])  throw new Error("invalid email or password")

    try {
      jwt.verify(password, SECRETS.JWT_SECRET);
    } catch(err) {
      if(!user) throw new Error("invalid email or password")
    }
    if(user[0].status === false) throw new Error("user is inactive")

    const company = await this.companyRepo.findById(user[0].company.id)
    if(!company) throw new Error("company not found")
    if (company.paymentStatus === CompanyPaymentStatusEnum.DEFAULTER) throw new Error('company has a pending payment')
    const token = await jwt.sign(user[0], SECRETS.JWT_SECRET)
    return { token }
  }
}
