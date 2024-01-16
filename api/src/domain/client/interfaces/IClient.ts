import { ICompany } from '@domain/company'

export interface IClient {
  id: string
  name: string
  company: ICompany
}
