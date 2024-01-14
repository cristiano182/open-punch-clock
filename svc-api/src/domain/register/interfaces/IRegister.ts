import { IJob } from '@domain/job'
import { IPerson } from '@domain/person'
import { RegisterStatus } from '../enum'

export interface IRegister {
  id: string
  start: Date
  end: Date
  job: IJob
  person: IPerson
  durationMinutes: number
  registerDate: Date
  status: RegisterStatus
}
