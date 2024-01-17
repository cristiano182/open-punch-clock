import { randomUUID } from 'crypto'
import { CompanyPaymentStatusEnum, ICompany, ICreateCompany, IUpdateCompany } from './interfaces'

export default class Company {
  private id: string
  private name: string
  private document: string
  private paymentStatus: CompanyPaymentStatusEnum

  static create(data: ICreateCompany): Company {
    const entity = new Company()
    entity.id = data.id || randomUUID()
    entity.name = data.name
    entity.document = data.document
    entity.paymentStatus = CompanyPaymentStatusEnum.FREE_TRIAL
    return entity
  }

  update(data: IUpdateCompany): this {
    this.name = data.name || this.name
    this.document = data.document || this.document
    this.paymentStatus = data.paymentStatus || this.paymentStatus
    return this
  }

  toJson(): ICompany {
    return {
      id: this.id,
      name: this.name,
      document: this.document,
      paymentStatus: this.paymentStatus,
    }
  }
}
