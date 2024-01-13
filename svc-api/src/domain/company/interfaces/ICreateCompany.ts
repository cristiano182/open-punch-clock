import { ICompany } from './ICompany'

export interface ICreateCompany extends Omit<ICompany, 'id'> {
  id?: string
}
