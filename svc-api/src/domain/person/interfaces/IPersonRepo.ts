import { IPerson, IListPerson } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IPersonRepo extends IRepo<IPerson> {
  search(params: IListPerson): Promise<IPagination<IPerson>>
}
