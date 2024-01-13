import { randomUUID } from 'crypto'
import { ICompany, ICreateCompany, IUpdateCompany } from './interfaces'

export default class Company {
  private id: string
  private name: string
  private document: string

  static create(data: ICreateCompany): Company {
    const entity = new Company()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    entity.document = data.document
    return entity
  }

  update(data: IUpdateCompany): this {
    this.name = data.name || this.name
    this.document = data.document || this.document
    return this
  }

  toJson(): ICompany {
    return {
      id: this.id,
      name: this.name,
      document: this.document,
    }
  }
}
