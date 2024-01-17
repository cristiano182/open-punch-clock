import 'reflect-metadata'
import jwt from "jsonwebtoken"
import TYPES from '../../common/types/Types'
import { inject, injectable } from 'inversify'
import { MyRequest } from '../../common/interfaces/IHttpRequest'
import SECRETS from '../../server/env'
import { IUser } from '@domain/user'
import { CompanyPaymentStatusEnum, ICompanyRepo } from '@domain/company'

export interface IAuthentication {
  execute(request: MyRequest<unknown>): Promise<IAuthenticationResponse>
}

export type IAuthenticationResponse = {
  user: IUser
}


@injectable()
export default class Authentication implements IAuthentication {
  constructor(@inject(TYPES.CompanyRepository) readonly companyRepo: ICompanyRepo) {}
  async execute(request: MyRequest<unknown>): Promise<IAuthenticationResponse> {
    let user: IUser
    const token = request.headers.Authorization.split('Bearer')[1]
    try {
      user = jwt.verify(token, SECRETS.JWT_SECRET) as IUser
    } catch (error) {
      throw new Error('permission denied')
    }
    const company = await this.companyRepo.findById(user.company.id)
    if(!company) throw new Error('company not found')
    if(company.paymentStatus === CompanyPaymentStatusEnum.DEFAULTER) throw new Error('company has a pending payment')

    return { user }
  }
}
