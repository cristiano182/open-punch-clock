import { IRepo } from '@domain/interfaces/IRepo'
import { ObjectLiteral, Repository, FindOptionsWhere } from 'typeorm'

export class Repo<T extends ObjectLiteral> implements IRepo<T> {
  constructor(protected readonly repo: Repository<any>) {}

  async create(entity: T): Promise<T> {
    return this.repo.save(entity)
  }

  async update(id: string, entity: Partial<T>): Promise<any> {
    return this.repo.update(id, entity)
  }

  async deleteById(id: string): Promise<void> {
    await this.repo.delete(id)
  }

  async findById(id: string): Promise<T | null> {
    const query: FindOptionsWhere<unknown> = { id }
    return this.repo.findOneBy(query)
  }
}
