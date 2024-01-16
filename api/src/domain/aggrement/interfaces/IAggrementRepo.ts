import { IAggrement, IListAggrement } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IAggrementRepo extends IRepo<IAggrement> {
  search(params: IListAggrement): Promise<IPagination<IAggrement>>
}
