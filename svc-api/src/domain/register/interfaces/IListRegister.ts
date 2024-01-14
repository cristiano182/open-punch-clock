import { IPaginationQuery } from '../../interfaces'
import { RegisterStatus } from '../enum'

export interface IListRegister extends IPaginationQuery {
  status?: RegisterStatus
}
