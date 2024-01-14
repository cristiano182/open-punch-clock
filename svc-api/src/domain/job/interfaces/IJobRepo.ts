import { IJob, IListJob } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IJobRepo extends IRepo<IJob> {
  search(params: IListJob): Promise<IPagination<IJob>>
}
