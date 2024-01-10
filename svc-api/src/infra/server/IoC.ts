import 'reflect-metadata'
import { Container } from 'inversify'
import getFilesFromPath from '../utils/path'



export default class IoC {
  public constructor(private container: Container = new Container({ skipBaseClassChecks: true })) {}
  getContainer(): Container {
    return this.container
  }

  async build(): Promise<void> {
   await this.injectUsecases()
   await this.injectValidators()
  }

 
  async injectUsecases(): Promise<void> {
    const usecases = await getFilesFromPath<any>([__dirname, '../', '../', 'usecases', '*' ,'*.(t|j)s'])
    for (const { name, file: usecase } of usecases) {
    const type = ''
    this.container.bind(Symbol.for(name)).to(usecase)
    }
  } 

  async injectValidators(): Promise<void> {
    const validators = await getFilesFromPath<any>([__dirname, '../', '../', 'usecases', '*' , 'validators' ,'*.(t|j)s'])
    for (const { name, file: validator } of validators) {
    this.container.bind(Symbol.for(name)).to(validator)
    }
  } 
}
