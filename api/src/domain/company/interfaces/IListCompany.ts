import { IPaginationQuery } from '@domain/interfaces'

export interface IListCompany extends IPaginationQuery {
  name?: string
  document?: string
  email?: string
}
