import 'reflect-metadata'
import TYPES from '../../common/types/Types'
import { Container, injectable } from 'inversify'
import Authentication, { IAuthentication } from './authentication'
import Module from '../../global/interfaces/IModule'

@injectable()
export default class AuthenticationModule extends Module {
  static async build(container: Container): Promise<AuthenticationModule> {
    const module = new AuthenticationModule(container)
    await module.configurations()
    return module
  }

  async start(): Promise<void> {}

  async configurations(): Promise<void> {
    this.container.bind<IAuthentication>(TYPES.Authentication).to(Authentication)
  }
}
