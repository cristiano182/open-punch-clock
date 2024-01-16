import { IFunctionalityUser } from './IFunctionalityUser'

export interface ICreateFunctionalityUser extends Omit<IFunctionalityUser, 'id'> {
  id?: string
}
