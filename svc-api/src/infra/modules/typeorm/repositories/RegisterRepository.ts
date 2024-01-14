import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindManyOptions, FindOptionsWhere } from 'typeorm'
import RegisterModel from '../schemas/RegisterSchema'
import { IRegister, IRegisterRepo, IListRegister } from '@domain/register/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class RegisterRepository extends Repo<IRegister> implements IRegisterRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(RegisterModel))
  }

  async search(params: IListRegister): Promise<IPagination<IRegister>> {
    const { status = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListRegister> = {
      ...(status ? { status } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['person', 'job'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
