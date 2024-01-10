import 'reflect-metadata'
import TYPES from '../../@common/Types'
import { Container, injectable } from 'inversify'
import Authentication, { IAuthentication } from './authentication'
import IModule from '../../server/modules';


@injectable()
export default class AuthenticationModule extends IModule {

  static async build(container: Container): Promise<AuthenticationModule> {
    const module = new AuthenticationModule(container);
    return module;
  }

    async configurations(): Promise<void> {
    this.container.bind<IAuthentication>(TYPES.Authentication).to(Authentication)
  } 
}



