import amqplib, { Channel } from 'amqplib'
import 'reflect-metadata'
import TYPES from '../../common/types/Types'
import { Container, injectable } from 'inversify'
import readFilesFromPath from '../../utils/path'
import Producer from './Producer'
import MessageChannel from './MessageChannel'
import Module from '../../global/interfaces/IModule'

@injectable()
export default class RabbitMQModule extends Module {
  private amqp: any

  static async build(container: Container): Promise<RabbitMQModule> {
    const module = new RabbitMQModule(container)
    await module.configurations()
    return module
  }

  async start(): Promise<void> {
    await this.readProducers()
    await this.readConsumers()
    return
  }

  async configurations(): Promise<void> {
    this.amqp = await amqplib.connect(`amqp://username:password@localhost:5672`)
    const channel = await this.amqp.createChannel()
    await this.includeExchanges(channel)
    await this.includeQueues(channel)
    channel.close()
  }

  private async includeExchanges(channel: Channel): Promise<void> {
    const exchanges: any = await readFilesFromPath([__dirname, 'exchanges', '*Exchange.(t|j)s'])

    for (const { file: exchange } of exchanges) {
      const exchangeInstance = new exchange()
      const schemas = exchangeInstance.schemas

      if (!schemas) continue

      for (const schema of schemas) {
        const { name, type, options } = schema
        await channel.assertExchange(name, type, options)
      }
    }
  }

  private async includeQueues(channel: Channel) {
    const queues: any = await readFilesFromPath([__dirname, 'queues', '*Queue.(t|j)s'])

    for (const { file: queue } of queues) {
      const queueInstance = new queue()
      const schemas = queueInstance.schemas

      if (!schemas) continue

      for (const schema of schemas) {
        const { options, name, bindings = [] } = schema
        await channel.assertQueue(name, options)
        for (const binding of bindings) {
          await channel.bindQueue(name, binding.exchange, binding.routingKey)
        }
      }
    }
  }

  public async readConsumers(): Promise<void> {
    const channel = await this.amqp.createChannel()
    channel.prefetch(4)
    this.container.bind(TYPES.MessageChannel).toConstantValue(new MessageChannel(channel))

    const consumers: any = await readFilesFromPath([__dirname, 'consumers', '*Consumer.(t|j)s'])

    for (const { file: consumer, name } of consumers) {
      if (!consumer) continue

      this.container.bind(Symbol.for(name)).to(consumer)
      const consumerInstance: any = this.container.get(Symbol.for(name))

      channel.consume(consumerInstance.queueName, (msg: any) => {
        if (msg) consumerInstance.handler(msg)
      })
    }
  }

  public async readProducers(): Promise<void> {
    const channel = await this.amqp.createChannel()
    this.container.bind(TYPES.Producer).toConstantValue(new Producer(channel))
  }

  async stop(): Promise<void> {
    await this.amqp.close()
  }
}
