import { IRegister } from './IRegister'

export interface ICreateRegister extends Omit<IRegister, 'id'> {
  id?: string
}
