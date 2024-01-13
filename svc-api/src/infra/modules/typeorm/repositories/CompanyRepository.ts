import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import CompanyModel from '../schemas/CompanySchema'
import { ICompany, ICompanyRepo, IListCompany } from '@domain/company/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class CompanyRepository extends Repo<ICompany> implements ICompanyRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(CompanyModel))
  }

  async search(params: IListCompany): Promise<IPagination<ICompany>> {
    const { name = '', document = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListCompany> = {
      ...(name ? { name } : {}),
      ...(document ? { document } : {}),
    }
    const [data, count] = await this.repo.findAndCount({ where: query, skip, take: limit })
    return { data, count, limit: +limit, skip: +skip }
  }
}
