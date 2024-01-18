import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import UserModel from '../schemas/UserSchema'
import { IUser, IUserRepo, IListUser } from '@domain/user/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class UserRepository extends Repo<IUser> implements IUserRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(UserModel))
  }

  async search(params: IListUser): Promise<IPagination<IUser>> {
    const { email = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListUser> = {
      ...(email ? { email } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['company'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
