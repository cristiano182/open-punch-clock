import { ICompany } from '@domain/company'
import { randomUUID } from 'crypto'
import { IPerson, ICreatePerson, IUpdatePerson } from './interfaces'

export default class Person {
  private id: string
  private name: string
  private email: string
  private document: string
  private phone: string
  private password: string
  private status: boolean
  private company: ICompany

  static create(data: ICreatePerson): Person {
    const entity = new Person()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    entity.email = data.email
    entity.document = data.document
    entity.phone = data.phone
    entity.password = data.password
    entity.status = data.status
    entity.company = data.company
    return entity
  }

  update(data: IUpdatePerson): this {
    this.name = data.name || this.name
    this.email = data.email || this.email
    this.document = data.document || this.document
    this.phone = data.phone || this.phone
    this.status = data.status || this.status
    this.password = data.password || this.password
    return this
  }

  toJson(): IPerson {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      document: this.document,
      phone: this.phone,
      password: this.password,
      status: this.status,
      company: this.company,
    }
  }
}
