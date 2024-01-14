import { ICompany } from '@domain/company'

export interface IPerson {
  id: string
  company: ICompany
  name: string
  email: string
  document: string
  phone: string
  password: string
  status: boolean
}
