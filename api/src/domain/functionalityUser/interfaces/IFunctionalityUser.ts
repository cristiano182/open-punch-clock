import { IFunctionality } from '@domain/functionality/interfaces'
import { IUser } from '@domain/user'

export interface IFunctionalityUser {
  id: string
  functionality: IFunctionality
  user: IUser
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}
