export interface ErrorDescription {
  code: string
  field?: string
  message?: string
}
export default class BaseException extends Error {
  constructor(public message: string, public fields: Array<ErrorDescription>) {
    super(message)
  }
}
