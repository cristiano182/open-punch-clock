import { IRepo, IPagination } from '@domain/interfaces'
import { ICompany, IListCompany } from '..'

export interface ICompanyRepo extends IRepo<ICompany> {
  search(params: IListCompany): Promise<IPagination<ICompany>>
}
