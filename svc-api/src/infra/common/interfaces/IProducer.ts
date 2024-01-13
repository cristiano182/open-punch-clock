export default interface IProducer {
  publish<TParams>(exchange: string, routingKey: string, params: TParams): boolean
  sendToQueue<TParams>(queueName: string, params: TParams, properties?: Record<string, unknown>): boolean
}
