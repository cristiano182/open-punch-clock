import { RegisterStatus } from '../enum'

export class Register {
  id: string
  jobId: string
  personId: string
  init: Date
  finaly: Date
  durationMinutes: number
  registerDate: Date
  status: RegisterStatus
}
