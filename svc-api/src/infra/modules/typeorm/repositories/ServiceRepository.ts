import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import ServiceModel from '../schemas/ServiceSchema'
import { IService, IServiceRepo, IListService } from '@domain/service/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class ServiceRepository extends Repo<IService> implements IServiceRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(ServiceModel))
  }

  async search(params: IListService): Promise<IPagination<IService>> {
    const { name = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListService> = {
      ...(name ? { name } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['aggrement', 'jobs'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
