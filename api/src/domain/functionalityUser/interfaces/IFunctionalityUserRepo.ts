import { IFunctionalityUser, IListFunctionalityUser } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IFunctionalityUserRepo extends IRepo<IFunctionalityUser> {
  search(params: IListFunctionalityUser): Promise<IPagination<IFunctionalityUser>>
}
