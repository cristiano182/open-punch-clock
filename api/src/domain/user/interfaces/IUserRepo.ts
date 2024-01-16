import { IPagination, IRepo } from '@domain/interfaces'
import { IUser, IListUser } from '..'

export interface IUserRepo extends IRepo<IUser> {
  search(params: IListUser): Promise<IPagination<IUser>>
}
