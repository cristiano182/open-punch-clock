import 'reflect-metadata'
import { inject, injectable } from 'inversify'

import TYPES from '../../infra/common/types/Types'
import Register from '../../domain/register/Register'
import { ICreateRegister, IRegister } from '../../domain/register'
import IUseCase from '@infra/common/interfaces/IUseCase'
import { IPersonRepo } from '@domain/person'
import { IJobRepo } from '@domain/job'
import IProducer from '@infra/common/interfaces/IProducer'
import { RegisterStatus } from '@domain/register/enum'

export type ICreateRegisterUseCaseParams = ICreateRegister
export type ICreateRegisterUseCaseResponse = IRegister

@injectable()
export default class CreateRegister implements IUseCase<ICreateRegisterUseCaseParams, ICreateRegisterUseCaseResponse> {
  constructor(
    @inject(TYPES.PersonRepository) private personRepo: IPersonRepo,
    @inject(TYPES.JobRepository) private jobRepo: IJobRepo,
    @inject(TYPES.Producer) private producer: IProducer,
  ) {}

  async execute(props: ICreateRegisterUseCaseParams): Promise<ICreateRegisterUseCaseResponse> {
    const person = await this.personRepo.findById(String(props.person))
    const job = await this.jobRepo.findById(String(props.job))

    if (!person || !job) throw new Error()
    if(!props.start || !props.end) props.status = RegisterStatus.APPROVED
    props.start = new Date()
    props.end = new Date()

    const register = Register.create({ ...props, person, job }).toJson()
    //return this.registerRepo.create(register.toJson())
    return register
  }
}
