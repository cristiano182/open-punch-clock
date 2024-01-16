import { CompanyPaymentStatusEnum } from "./CompanyPaymentStatusEnum"

export interface ICompany {
  id: string
  name: string
  document: string
  paymentStatus: CompanyPaymentStatusEnum
}
