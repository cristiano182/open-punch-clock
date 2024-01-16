import { CompanyPaymentStatusEnum } from "./CompanyPaymentStatusEnum"

export interface IUpdateCompany {
  id: string
  name?: string
  document?: string
  paymentStatus?: CompanyPaymentStatusEnum
}
