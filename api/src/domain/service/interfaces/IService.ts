import { IAggrement } from '@domain/aggrement'

export interface IService {
  id: string
  name: string
  aggrement: IAggrement
}
