import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import ClientModel from '../schemas/ClientSchema'
import { Repo } from './Repo'
import { IClient, IClientRepo, IListClient } from '@domain/client'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class ClientRepository extends Repo<IClient> implements IClientRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(ClientModel))
  }

  async search(params: IListClient): Promise<IPagination<IClient>> {
    const { name = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListClient> = {
      ...(name ? { name } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['company', 'aggrements'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
