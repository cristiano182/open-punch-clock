import { IQueueSchema } from '../../interfaces'
import IQueue from '../../interfaces/IQueue'

export default class Queue implements IQueue {
  public schemas!: Array<IQueueSchema>
}
