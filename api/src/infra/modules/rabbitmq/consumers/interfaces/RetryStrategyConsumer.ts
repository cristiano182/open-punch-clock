import IProducer from '@infra/common/interfaces/IProducer'
import IUseCase from '@infra/common/interfaces/IUseCase'

import { Message } from 'amqplib'
import { injectable } from 'inversify'

import MessageChannel from '../../MessageChannel'
import { Consumer } from './Consumer'

@injectable()
export class RetryStrategyConsumer<TParams, TResponse> extends Consumer<TParams, TResponse> {
  dlqQueueName: string
  retryQueueName: string
  maxRetryCount: number

  constructor(
    public queueName: string,
    protected producer: IProducer,
    protected messageChannel: MessageChannel,
    protected useCase: IUseCase<TParams, TResponse>,
  ) {
    super(queueName, messageChannel, useCase)
    this.dlqQueueName = `${this.queueName}.dlq`
    this.retryQueueName = `${this.queueName}.retry`
    this.maxRetryCount = 24
  }

  async handler(msg: Message): Promise<void> {
    const payload = this.parseMessageContent(msg.content)

    try {
      await this.useCase.execute(payload)
    } catch (error) {
      const qtdRetries = (msg.properties.headers['oi-retry-count'] || 0) + 1

      if (qtdRetries > this.maxRetryCount || this.customErrorValidator(error, payload)) {
        this.producer.sendToQueue(this.dlqQueueName, msg.content, { ...msg.properties })
        return
      }

      this.producer.sendToQueue(this.retryQueueName, msg.content, {
        ...msg.properties,
        headers: {
          ...msg.properties.headers,
          'oi-retry-count': qtdRetries,
        },
      })
    } finally {
      this.messageChannel.ack(msg)
    }
  }

  protected customErrorValidator(_error: unknown, _params: TParams): boolean {
    return false
  }
}
