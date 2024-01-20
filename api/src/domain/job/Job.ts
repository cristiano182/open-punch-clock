import { IService } from '@domain/service'
import { randomUUID } from 'crypto'
import { IJob, ICreateJob, IUpdateJob } from './interfaces'

export default class Job {
  private id: string
  private name: string
  private durationMinutes: number
  private service: IService

  static create(data: ICreateJob): Job {
    const entity = new Job()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    entity.service = data.service
    entity.durationMinutes = data.durationMinutes
    return entity
  }

  update(data: IUpdateJob): this {
    this.name = data.name || this.name
    this.durationMinutes = data.durationMinutes || this.durationMinutes
    return this
  }

  toJson(): IJob {
    return {
      id: this.id,
      name: this.name,
      service: this.service,
      durationMinutes: this.durationMinutes,
    }
  }
}
