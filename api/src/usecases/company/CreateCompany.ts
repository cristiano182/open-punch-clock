import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { ICompany, ICompanyRepo, ICreateCompany } from '@domain/company/interfaces'
import TYPES from '../../infra/common/types/Types'
import Company from '../../domain/company/Company'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { isEmpty } from 'lodash'
import { IUser, IUserRepo } from '@domain/user'
import User from '@domain/user/User'
import FunctionalityUser from '@domain/functionalityUser/FunctionalityUser'
import { IFunctionalityRepo } from '@domain/functionality'
import { ITransaction, ITransactionRepo } from '@domain/transaction/ITransactionRepo'
import Functionality from '@domain/functionality/Functionality'
import jwt from "jsonwebtoken"
import SECRETS  from '../../infra/server/env'

@injectable()
export default class CreateCompany implements IUseCase<ICreateCompany, ICompany> {
  constructor(
    @inject(TYPES.CompanyRepository) private companyRepo: ICompanyRepo,
    @inject(TYPES.UserRepository) private userRepository: IUserRepo,
    @inject(TYPES.FunctionalityRepository) private functionalityRepository: IFunctionalityRepo,
    @inject(TYPES.TransactionRepository) private transactionRepository: ITransactionRepo
    ) {}

  async execute(props: ICreateCompany): Promise<ICompany> {
    const { document, email, name } = props
    const transaction: ITransaction = { data: [] }


    const companys = await this.companyRepo.search({ email, document, name })
    if(!isEmpty(companys.data)) throw new Error('email, name or document company already exists')

    const users = await this.userRepository.search({ email })
    if(!isEmpty(users.data)) throw new Error('user email already exists')

    const functionalitys = await this.functionalityRepository.search({})
    const defaultPassword = jwt.sign('newCompany@2024', SECRETS.JWT_SECRET)

    const company = Company.create(props)
    const user = User.create({email, password: defaultPassword, company: company.toJson(), status: true})
    transaction.data.push({ entity: company}, { entity: user})

    functionalitys.data.forEach((func) => {
      const functionality = Functionality.create(func).toJson()
      const functionalityUser = FunctionalityUser.create({user: {} as IUser, functionality, create: true, update: true, delete: true, read:true})
      transaction.data.push({ entity: functionalityUser })
    })

    await this.transactionRepository.transaction(transaction)

    return company
  }
}
