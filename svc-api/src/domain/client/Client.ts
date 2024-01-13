import { randomUUID } from 'crypto'
import { IClient, ICreateClient, IUpdateClient } from './interfaces'

export default class Client {
  private id: string
  private name: string

  static create(data: ICreateClient): Client {
    const entity = new Client()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    return entity
  }

  update(data: IUpdateClient): this {
    this.name = data.name || this.name
    return this
  }

  toJson(): IClient {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
