import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from './Types'
import { ICreateCompany, ICreateCompanyValidator } from '@/domain/company/interfaces'
import CreateCompanyController from '../modules/http/controllers/CreateCompanyController'
import CreateCompany from '../../usecases/company/CreateCompany'
import CreateCompanyValidator from '../../usecases/company/validators/CreateCompanyValidator'

export default class IoC {
  public constructor(private container: Container = new Container({ skipBaseClassChecks: true })) {}
  getContainer(): Container {
    return this.container
  }

  build(): void {
    this.container.bind<ICreateCompany>(TYPES.CreateCompany).to(CreateCompany)
    this.container.bind<ICreateCompanyValidator>(TYPES.CreateCompanyValidator).to(CreateCompanyValidator)
    this.container.bind<CreateCompanyController>(TYPES.CreateCompanyController).to(CreateCompanyController)
  }
}
