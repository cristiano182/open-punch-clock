import { IService, IListService } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IServiceRepo extends IRepo<IService> {
  search(params: IListService): Promise<IPagination<IService>>
}
