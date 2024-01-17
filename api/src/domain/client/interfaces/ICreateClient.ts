import { IUser } from '@domain/user'
import { IClient } from './IClient'

export interface ICreateClient extends Omit<IClient, 'id'> {
  id?: string,
  user: IUser
}
