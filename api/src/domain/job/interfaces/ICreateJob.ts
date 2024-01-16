import { IJob } from './IJob'

export interface ICreateJob extends Omit<IJob, 'id'> {
  id?: string
}
