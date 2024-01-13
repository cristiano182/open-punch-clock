import { Channel, Message } from 'amqplib'

export default class MessageChannel {
  constructor(private readonly channel: Channel) {}

  ack(msg: Message): void {
    this.channel.ack(msg)
  }

  nack(msg: Message): void {
    this.channel.nack(msg)
  }
}
