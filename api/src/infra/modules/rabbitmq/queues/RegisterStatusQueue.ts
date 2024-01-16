import QueueWithRetryStrategy from './interfaces/RetryStrategyQueue'

export default class RegisterStatusQueue extends QueueWithRetryStrategy {
  constructor() {
    const exchange = 'company'
    const queueName = 'company.register.status'
    const bindings = [
      {
        routingKey: 'provider.document.updated',
        exchange,
      },
      // {
      //   routingKey: 'hash.document.updated',
      //   exchange,
      // },
    ]
    const retryQueueMessageTTL = 1000 * 60 * 60

    super()
    this.schemas = super.createWithRetryStrategy(queueName, exchange, bindings, retryQueueMessageTTL)
  }
}
