import PreconditionFailedException from './PreconditionFailedException'

export default class FieldUndefinedException<T> extends PreconditionFailedException {
  constructor(fields: Array<keyof T>) {
    const message = 'Some fields are undefined'
    super(
      message,
      fields.map((field) => ({
        code: `${String(field)}_UNDEFINED`.toUpperCase(),
        field: `${String(field)}`,
      })),
    )
  }
}
