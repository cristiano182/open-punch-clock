import { IRegister, IListRegister } from '..'
import { IPagination, IRepo } from '../../interfaces/index'

export interface IRegisterRepo extends IRepo<IRegister> {
  search(params: IListRegister): Promise<IPagination<IRegister>>
}
