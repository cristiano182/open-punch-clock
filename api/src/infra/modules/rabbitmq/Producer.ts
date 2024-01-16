import IProducer from '@infra/common/interfaces/IProducer'
import { Channel } from 'amqplib'

export default class Producer implements IProducer {
  constructor(private readonly producerChannel: Channel) {}

  private parseDataToBuffer(data: any): Buffer {
    return Buffer.isBuffer(data) ? data : Buffer.from(JSON.stringify(data))
  }

  publish<TParams>(exchange: string, routingKey: string, params: TParams): boolean {
    return this.producerChannel.publish(exchange, routingKey, this.parseDataToBuffer(params), {
      persistent: true,
    })
  }

  sendToQueue<TParams>(queueName: string, params: TParams, properties: Record<string, unknown>): boolean {
    return this.producerChannel.sendToQueue(queueName, this.parseDataToBuffer(params), {
      persistent: true,
      ...properties,
    })
  }
}
