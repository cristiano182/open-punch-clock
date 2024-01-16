import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'

import IUseCase from '@infra/common/interfaces/IUseCase'
import { ICreateService, IService, IServiceRepo } from '@domain/service'
import Service from '@domain/service/Service'
import { IAggrementRepo } from '@domain/aggrement'

export type ICreateServiceUseCaseParams = ICreateService
export type ICreateServiceUseCaseResponse = IService

@injectable()
export default class CreateService implements IUseCase<ICreateServiceUseCaseParams, ICreateServiceUseCaseResponse> {
  constructor(
    @inject(TYPES.ServiceRepository) private serviceRepo: IServiceRepo,
    @inject(TYPES.AggrementRepository) private aggrementRepo: IAggrementRepo,
  ) {}

  async execute(props: ICreateServiceUseCaseParams): Promise<ICreateServiceUseCaseResponse> {
    const aggrement = await this.aggrementRepo.findById(String(props.aggrement))

    if (!aggrement) throw new Error()

    const service = Service.create({ ...props, aggrement })
    return this.serviceRepo.create(service.toJson())
  }
}
