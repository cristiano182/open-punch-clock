import { randomUUID } from 'crypto'
import { IFunctionality, IUpdateFunctionality } from '.'
import { ICreateFunctionality } from './interfaces/ICreateFunctionality'

export default class Functionality {
  private id: string
  private name: string

  static create(data: ICreateFunctionality): Functionality {
    const entity = new Functionality()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    return entity
  }

  update(data: IUpdateFunctionality): this {
    this.name = data.name || this.name
    return this
  }

  toJson(): IFunctionality {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
