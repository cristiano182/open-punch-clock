import BaseException from './BaseException'

export interface ErrorDescription {
  code: string
  field?: string
  message?: string
}

export default class ValidatorException extends BaseException {
  constructor(public fields: Array<ErrorDescription>) {
    super('Invalid params validator', fields)
  }
}
