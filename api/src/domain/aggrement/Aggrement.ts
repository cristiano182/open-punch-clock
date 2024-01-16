import { IClient } from '@domain/client'
import { randomUUID } from 'crypto'
import { IAggrement, ICreateAggrement, IUpdateAggrement } from './interfaces'

export default class Aggrement {
  private id: string
  private name: string
  private client: IClient

  static create(data: ICreateAggrement): Aggrement {
    const entity = new Aggrement()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    entity.client = data.client
    return entity
  }

  update(data: IUpdateAggrement): this {
    this.name = data.name || this.name
    return this
  }

  toJson(): IAggrement {
    return {
      id: this.id,
      name: this.name,
      client: this.client,
    }
  }
}
