import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import FunctionalityUser from '../../domain/functionalityUser/FunctionalityUser'
import { ICreateFunctionalityUser, IFunctionalityUser, IFunctionalityUserRepo } from '../../domain/functionalityUser'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { IUserRepo } from '@domain/user'
import { IFunctionalityRepo } from '@domain/functionality'

export type ICreateFunctionalityUserUseCaseParams = ICreateFunctionalityUser
export type ICreateFunctionalityUserUseCaseResponse = IFunctionalityUser

@injectable()
export default class CreateFunctionalityUser
  implements IUseCase<ICreateFunctionalityUserUseCaseParams, ICreateFunctionalityUserUseCaseResponse>
{
  constructor(
    @inject(TYPES.FunctionalityUserRepository) private functionalityUserRepo: IFunctionalityUserRepo,
    @inject(TYPES.UserRepository) private userRepo: IUserRepo,
    @inject(TYPES.FunctionalityRepository) private functionalityRepo: IFunctionalityRepo,
  ) {}

  async execute(props: ICreateFunctionalityUserUseCaseParams): Promise<ICreateFunctionalityUserUseCaseResponse> {
    const user = await this.userRepo.findById(String(props.user))
    const functionality = await this.functionalityRepo.findById(String(props.functionality))

    if (!user || !functionality) throw new Error()

    const functionalityUser = FunctionalityUser.create({ ...props, functionality, user })
    return this.functionalityUserRepo.create(functionalityUser.toJson())
  }
}
