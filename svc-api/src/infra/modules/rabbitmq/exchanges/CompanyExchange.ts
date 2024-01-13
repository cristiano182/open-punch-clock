import DirectExchange from './interfaces/DirectExchange'
import TopicExchange from './interfaces/TopicExchange'

export default class SignatureExchange extends TopicExchange {
  constructor() {
    const exchangeName = 'company'
    super()
    this.schemas = [super.defaultTopicExchange(exchangeName)]
  }
}
