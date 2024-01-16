import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import PersonModel from '../schemas/PersonSchema'
import { IPerson, IPersonRepo, IListPerson } from '@domain/person/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class PersonRepository extends Repo<IPerson> implements IPersonRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(PersonModel))
  }

  async search(params: IListPerson): Promise<IPagination<IPerson>> {
    const { name = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListPerson> = {
      ...(name ? { name } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['company', 'registers'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
