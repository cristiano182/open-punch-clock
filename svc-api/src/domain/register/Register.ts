import { IJob } from '@domain/job'
import { IPerson } from '@domain/person'
import { randomUUID } from 'crypto'
import { RegisterStatus } from './enum'
import { IRegister, ICreateRegister, IUpdateRegister } from './interfaces'

export default class Register {
  private id: string
  private start: Date
  private end: Date
  private durationMinutes: number
  private registerDate: Date
  private status: RegisterStatus
  private job: IJob
  private person: IPerson

  static create(data: ICreateRegister): Register {
    const entity = new Register()

    entity.id = data.id || randomUUID()
    entity.start = data.start
    entity.end = data.end
    entity.durationMinutes = data.durationMinutes
    entity.registerDate = data.registerDate
    entity.status = data.status
    entity.job = data.job
    entity.person = data.person

    return entity
  }

  update(data: IUpdateRegister): this {
    this.status = data.status || this.status
    return this
  }

  toJson(): IRegister {
    return {
      id: this.id,
      start: this.start,
      end: this.end,
      durationMinutes: this.durationMinutes,
      registerDate: this.registerDate,
      status: this.status,
      job: this.job,
      person: this.person,
    }
  }
}
