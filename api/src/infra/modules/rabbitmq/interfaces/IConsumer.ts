import { Message } from 'amqplib'

export interface IConsumer {
  queueName: string
  handler(msg: Message): Promise<void>
}
