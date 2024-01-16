import { IExchangeSchema } from '../../interfaces/IExchange'
import Exchange from './Exchange'

export default class TopicExchange extends Exchange {
  protected defaultTopicExchange(exchangeName: string): IExchangeSchema {
    return {
      name: exchangeName,
      options: {
        durable: true,
        autoDelete: false,
      },
      type: 'topic',
    }
  }
}
