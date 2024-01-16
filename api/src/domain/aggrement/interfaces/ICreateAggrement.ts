import { IAggrement } from './IAggrement'

export interface ICreateAggrement extends Omit<IAggrement, 'id'> {
  id?: string
}
