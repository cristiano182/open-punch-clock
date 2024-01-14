import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import Aggrement from '../../domain/aggrement/Aggrement'
import { ICreateAggrement, IAggrement, IAggrementRepo } from '../../domain/aggrement'
import { IClientRepo } from '@domain/client'
import IUseCase from '@infra/common/interfaces/IUseCase'

export type ICreateAggrementUseCaseParams = ICreateAggrement
export type ICreateAggrementUseCaseResponse = IAggrement

@injectable()
export default class CreateAggrement
  implements IUseCase<ICreateAggrementUseCaseParams, ICreateAggrementUseCaseResponse>
{
  constructor(
    @inject(TYPES.AggrementRepository) private aggrementRepo: IAggrementRepo,
    @inject(TYPES.ClientRepository) private clientRepo: IClientRepo,
  ) {}

  async execute(props: ICreateAggrementUseCaseParams): Promise<ICreateAggrementUseCaseResponse> {
    const client = await this.clientRepo.findById(String(props.client))

    if (!client) throw new Error()

    console.log(props.client)
    const aggrement = Aggrement.create({ ...props, client })
    return this.aggrementRepo.create(aggrement.toJson())
  }
}
