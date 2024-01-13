import { IRepo } from '@domain/interfaces/IRepo'
import { ObjectLiteral, Repository } from 'typeorm'

export class Repo<T extends ObjectLiteral> implements IRepo<T> {
  constructor(protected readonly repo: Repository<T>) {}

  async create(entity: T): Promise<T> {
    return this.repo.save(entity)
  }

  async update(id: string, entity: Partial<T>): Promise<any> {
    return this.repo.update(id, entity)
  }

  async deleteById(id: string): Promise<void> {
    await this.repo.delete(id)
  }

  async find(params: Partial<T>): Promise<T | null> {
    return this.repo.findOne({ where: params })
  }
}
