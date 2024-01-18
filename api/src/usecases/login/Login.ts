import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import { IUserRepo } from '../../domain/user'
import IUseCase from '../../infra/common/interfaces/IUseCase'
import { ICompanyRepo, CompanyPaymentStatusEnum, ICompany } from '../../domain/company'
import jwt from "jsonwebtoken"
import SECRETS  from '../../infra/server/env'
import { IFunctionalityUser, IFunctionalityUserRepo } from '@domain/functionalityUser'

export type ILoginUseCaseParams = { email: string, password: string }
export type ILoginUseCaseResponse = { token: string}
type ITokenUser = { status: boolean, email: string, company: ICompany, id: string, functionalitysUser: IFunctionalityUser[]}

@injectable()
export default class Login implements IUseCase<ILoginUseCaseParams, ILoginUseCaseResponse> {
  constructor(
    @inject(TYPES.UserRepository) private userRepo: IUserRepo,
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
    @inject(TYPES.FunctionalityUserRepository) private _functionalityUserRepository: IFunctionalityUserRepo,
  ) {}

  async execute(props: ILoginUseCaseParams): Promise<ILoginUseCaseResponse> {
    const {email, password} = props
    const { data: user } = await this.userRepo.search({ email })
    if(!user[0])  throw new Error("invalid email or password")
    const {status, company: companyUser, id } = user[0]

    const passwordEncoded =  jwt.sign(password, SECRETS.JWT_SECRET)

    if(passwordEncoded !==  user[0].password) throw new Error("invalid email or password")

    if(status === false) throw new Error("user is inactive")

    const company = await this.companyRepo.findById(user[0].company.id)
    if(!company) throw new Error("company not found")
    if (company.paymentStatus === CompanyPaymentStatusEnum.DEFAULTER) throw new Error('company has a pending payment')

   // const functionalitysUser = await this.functionalityUserRepository.search({ user: user[0]})
    const response:ITokenUser ={ email, status, id, company: companyUser, functionalitysUser: []}
    const token =  jwt.sign(response, SECRETS.JWT_SECRET)
    return { token }
  }
}
