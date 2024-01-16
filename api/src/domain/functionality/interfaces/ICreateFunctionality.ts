import { IFunctionality } from './IFunctionality'

export interface ICreateFunctionality extends Omit<IFunctionality, 'id'> {
  id?: string
}
