import { IFunctionality } from '@domain/functionality'
import { IUser } from '@domain/user'
import { randomUUID } from 'crypto'
import { IFunctionalityUser, ICreateFunctionalityUser, IUpdateFunctionalityUser } from './interfaces'

export default class FunctionalityUser {
  private id: string
  private functionality: IFunctionality
  private user: IUser
  private create: boolean
  private read: boolean
  private update: boolean
  private delete: boolean

  static create(data: ICreateFunctionalityUser): FunctionalityUser {
    const entity = new FunctionalityUser()
    entity.id = data.id || randomUUID()
    entity.functionality = data.functionality
    entity.user = data.user
    entity.create = data.create
    entity.read = data.read
    entity.update = data.update
    entity.delete = data.delete

    return entity
  }

  updateEntity(data: IUpdateFunctionalityUser): this {
    this.create = data.create || this.create
    this.read = data.read || this.read
    this.update = data.update || this.update
    this.delete = data.delete || this.delete
    return this
  }

  toJson(): IFunctionalityUser {
    return {
      id: this.id,
      user: this.user,
      functionality: this.functionality,
      create: this.create,
      read: this.read,
      update: this.update,
      delete: this.delete,
    }
  }
}
