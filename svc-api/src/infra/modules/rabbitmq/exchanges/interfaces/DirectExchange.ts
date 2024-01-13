import { IExchangeSchema } from '../../interfaces/IExchange'
import Exchange from './Exchange'

export default class DirectExchange extends Exchange {
  protected defaultDirectExchange(exchangeName: string): IExchangeSchema {
    return {
      name: exchangeName,
      options: {
        durable: true,
        autoDelete: false,
      },
      type: 'direct',
    }
  }
}
