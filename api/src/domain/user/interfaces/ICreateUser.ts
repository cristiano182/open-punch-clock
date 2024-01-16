import { IUser } from './IUser'

export interface ICreateUser extends Omit<IUser, 'id'> {
  id?: string
}
