export interface IExchangeSchema {
  name: string
  type: 'direct' | 'topic' | 'headers' | 'fanout' | 'match'
  options: {
    durable: boolean
    autoDelete: false
  }
}

export default interface IExchange {
  schemas: Array<IExchangeSchema>
}
