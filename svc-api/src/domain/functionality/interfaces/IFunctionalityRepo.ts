import { IFunctionality, IListFunctionality } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IFunctionalityRepo extends IRepo<IFunctionality> {
  search(params: IListFunctionality): Promise<IPagination<IFunctionality>>
}
