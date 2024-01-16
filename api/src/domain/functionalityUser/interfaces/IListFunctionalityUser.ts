import { IFunctionality } from '@domain/functionality/interfaces'
import { IUser } from '@domain/user'
import { IPaginationQuery } from '../../interfaces'

export interface IListFunctionalityUser extends IPaginationQuery {
  user?: Partial<IUser>
  functionality?: Partial<IFunctionality>
}
