import { ICompany } from '@domain/company'

export interface IUser {
  id: string
  email: string
  password: string
  status: boolean
  company: ICompany
}
