import { CompanyPaymentStatusEnum } from "./CompanyPaymentStatusEnum"

export interface ICompany {
  id: string
  name: string
  email: string
  document: string
  paymentStatus: CompanyPaymentStatusEnum
}
