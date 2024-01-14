import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import AggrementModel from '../schemas/AggrementSchema'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'
import { IAggrement, IAggrementRepo, IListAggrement } from '@domain/aggrement'

@injectable()
export default class AggrementRepository extends Repo<IAggrement> implements IAggrementRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(AggrementModel))
  }

  async search(params: IListAggrement): Promise<IPagination<IAggrement>> {
    const { name = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListAggrement> = {
      ...(name ? { name } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['client', 'services'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
