export interface IBindingSchema {
  routingKey: string
  exchange: string
}

export interface IOptionsSchema {
  durable: boolean
  autoDelete: boolean
  arguments?: Record<string, string | number>
}

export interface IQueueSchema {
  name: string
  bindings?: Array<IBindingSchema>
  options?: IOptionsSchema
}

export default interface IQueue {
  schemas: Array<IQueueSchema>
}
