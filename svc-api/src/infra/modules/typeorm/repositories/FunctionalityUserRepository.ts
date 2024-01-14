import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import FunctionalityUserModel from '../schemas/FunctionalityUserSchema'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'
import { IFunctionalityUser, IFunctionalityUserRepo, IListFunctionalityUser } from '@domain/functionalityUser'

@injectable()
export default class FunctionalityUserRepository extends Repo<IFunctionalityUser> implements IFunctionalityUserRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(FunctionalityUserModel))
  }

  async search(params: IListFunctionalityUser): Promise<IPagination<IFunctionalityUser>> {
    const { user = '', functionality = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListFunctionalityUser> = {
      ...(user ? { user } : {}),
      ...(functionality ? { functionality } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['user', 'functionality'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
