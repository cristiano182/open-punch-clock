import { ICompany } from '@domain/company'
import { randomUUID } from 'crypto'
import { IUser, ICreateUser, IUpdateUser } from './interfaces'

export default class User {
   id: string
   email: string
   status: boolean
   password: string
   company: ICompany

  static create(data: ICreateUser): User {
    const entity = new User()
    entity.id = data.id || randomUUID()
    entity.email = data.email
    entity.status = data.status
    entity.password = data.password
    entity.company = data.company
    return entity
  }

  update(data: IUpdateUser): this {
    this.email = data.email || this.email
    this.status = data.status || this.status
    return this
  }

  toJson(): IUser {
    return {
      id: this.id,
      email: this.email,
      status: this.status,
      company: this.company,
      password: this.password,
    }
  }
}
