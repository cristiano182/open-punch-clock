import { IBindingSchema, IQueueSchema } from '../../interfaces'
import Queue from './Queue'

export default class RetryStrategyQueue extends Queue {
  protected createWithRetryStrategy(
    queueName: string,
    exchange: string,
    bindings: Array<IBindingSchema>,
    retryQueueMessageTTL: number = 1000 * 60 * 60,
  ): Array<IQueueSchema> {
    const defaultOptions = {
      durable: true,
      autoDelete: false,
    }

    const defaultBinding = {
      exchange: exchange,
      routingKey: queueName,
    }

    const defaultQueue = {
      name: queueName,
      options: defaultOptions,
      bindings: [...bindings, defaultBinding],
    }

    const retryQueue = {
      name: `${queueName}.retry`,
      options: {
        ...defaultOptions,
        arguments: {
          'x-message-ttl': retryQueueMessageTTL,
          'x-dead-letter-exchange': exchange,
          'x-dead-letter-routing-key': queueName,
        },
      },
    }

    const dlqQueue = {
      name: `${queueName}.dlq`,
      options: defaultOptions,
    }

    return [defaultQueue, retryQueue, dlqQueue]
  }
}
