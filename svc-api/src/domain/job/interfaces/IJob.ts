import { IService } from '@domain/service/interfaces'

export interface IJob {
  id: string
  name: string
  durationMinutes: number
  service: IService
}
