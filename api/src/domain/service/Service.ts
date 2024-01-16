import { IAggrement } from '@domain/aggrement'
import { randomUUID } from 'crypto'
import { IService, ICreateService, IUpdateService } from './interfaces'

export default class Service {
  private id: string
  private name: string
  private aggrement: IAggrement

  static create(data: ICreateService): Service {
    const entity = new Service()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    entity.aggrement = data.aggrement
    return entity
  }

  update(data: IUpdateService): this {
    this.name = data.name || this.name
    return this
  }

  toJson(): IService {
    return {
      id: this.id,
      name: this.name,
      aggrement: this.aggrement,
    }
  }
}
