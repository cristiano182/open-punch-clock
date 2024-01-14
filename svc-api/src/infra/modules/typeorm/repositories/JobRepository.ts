import TYPES from '../../../common/types/Types'
import { inject, injectable } from 'inversify'
import { DataSource as Connection, FindOptionsWhere } from 'typeorm'
import JobModel from '../schemas/JobSchema'
import { IJob, IJobRepo, IListJob } from '@domain/job/interfaces'
import { Repo } from './Repo'
import { IPagination } from '@domain/interfaces'

@injectable()
export default class JobRepository extends Repo<IJob> implements IJobRepo {
  constructor(@inject(TYPES.TypeORMConnection) private _conn: Connection) {
    super(_conn.getRepository(JobModel))
  }

  async search(params: IListJob): Promise<IPagination<IJob>> {
    const { name = '', limit = 10, skip = 0 } = params

    const query: FindOptionsWhere<IListJob> = {
      ...(name ? { name } : {}),
    }
    const [data, count] = await this.repo.findAndCount({
      where: query,
      skip,
      take: limit,
      relations: ['service', 'registers'],
    })
    return { data, count, limit: +limit, skip: +skip }
  }
}
