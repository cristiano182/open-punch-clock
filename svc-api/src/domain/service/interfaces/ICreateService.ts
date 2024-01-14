import { IService } from './IService'

export interface ICreateService extends Omit<IService, 'id'> {
  id?: string
}
