import IExchange, { IExchangeSchema } from '../../interfaces/IExchange'

export default class Exchange implements IExchange {
  schemas!: Array<IExchangeSchema>
}
