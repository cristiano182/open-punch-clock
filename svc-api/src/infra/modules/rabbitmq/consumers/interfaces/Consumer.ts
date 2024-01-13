import IUseCase from '@infra/common/interfaces/IUseCase'
import { Message } from 'amqplib'
import { injectable } from 'inversify'

import { IConsumer } from '../../interfaces'
import MessageChannel from '../../MessageChannel'

@injectable()
export class Consumer<TParams, TResponse> implements IConsumer {
  constructor(
    public queueName: string,
    protected messageChannel: MessageChannel,
    protected useCase: IUseCase<TParams, TResponse>,
  ) {}

  async handler(msg: Message): Promise<void> {
    const baseLogger = `[Consumer] [${this.queueName}]`
    const payload = this.parseMessageContent(msg.content)

    try {
      await this.useCase.execute(payload)

      this.messageChannel.ack(msg)
    } catch (error) {
      this.messageChannel.nack(msg)
    }
  }

  protected parseMessageContent(content: Buffer): TParams {
    try {
      return JSON.parse(content.toString())
    } catch (e) {
      return {} as TParams
    }
  }
}
