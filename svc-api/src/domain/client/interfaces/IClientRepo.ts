import { IClient, IListClient } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IClientRepo extends IRepo<IClient> {
  search(params: IListClient): Promise<IPagination<IClient>>
}
