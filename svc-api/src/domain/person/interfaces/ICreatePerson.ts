import { IPerson } from './IPerson'

export interface ICreatePerson extends Omit<IPerson, 'id'> {
  id?: string
}
