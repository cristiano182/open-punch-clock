import IProducer from '@infra/common/interfaces/IProducer'
import IUseCase from '@infra/common/interfaces/IUseCase'
import TYPES from '../../../common/types/Types'

import { inject, injectable } from 'inversify'

import MessageChannel from '../MessageChannel'
import { RetryStrategyConsumer } from './interfaces/RetryStrategyConsumer'

@injectable()
export default class SignConsumer extends RetryStrategyConsumer<any, void> {
  constructor(
    @inject(TYPES.Producer) producer: IProducer,
    @inject(TYPES.MessageChannel) messageChannel: MessageChannel,
    // @inject(TYPES.SignUseCase) useCase: SignUseCase,
  ) {
    super('company.register.status', producer, messageChannel, {} as IUseCase<any, any>)
  }
}
