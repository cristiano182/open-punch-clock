import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import FunctionalityModel from '../schemas/FunctionalitySchema'
import { IFunctionality, IFunctionalityRepo, IListFunctionality } from '@domain/functionality/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class FunctionalityRepository extends Repo<IFunctionality> implements IFunctionalityRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(FunctionalityModel))
  }

  async search(params: IListFunctionality): Promise<IPagination<IFunctionality>> {
    const { name = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListFunctionality> = {
      ...(name ? { name } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['functionalityUser'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
