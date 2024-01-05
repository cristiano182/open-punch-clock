import { ErrorCode } from './errorsCode'

export interface ICustomErrorField {
  code: ErrorCode
  field: string
  message: string
  statusCode?: number
}
export abstract class CustomError extends Error {
  constructor(error: ICustomErrorField) {
    super(error.message)
    this.code = error.code
    this.field = error.field
    this.statusCode = error.statusCode
  }
  field?: string
  code?: ErrorCode
  statusCode?: number
}

export class InvalidCompanyDocument extends CustomError {
    constructor(error: ICustomErrorField) {
      super({...error, statusCode: 412 })
    }
  }



