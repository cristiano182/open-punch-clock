import 'reflect-metadata'
import { Container } from 'inversify'
import readFilesFromPath from '../utils/path'

export default class IoC {
  public constructor(private container: Container = new Container({ skipBaseClassChecks: true })) {}
  getContainer(): Container {
    return this.container
  }
  async build(): Promise<void> {
    await this.bindUsecases()
    await this.bindValidators()
    return
  }

  async bindUsecases(): Promise<void> {
    const usecases = await readFilesFromPath<any>([__dirname, '../', '../', 'usecases', '*', '*.(t|j)s'])
    for (const { name, file: usecase } of usecases) {
      this.container.bind(Symbol.for(name)).to(usecase)
    }
  }

  async bindValidators(): Promise<void> {
    const validators = await readFilesFromPath<any>([
      __dirname,
      '../',
      '../',
      'usecases',
      '*',
      'validators',
      '*.(t|j)s',
    ])
    for (const { name, file: validator } of validators) {
      this.container.bind(Symbol.for(name)).to(validator)
    }
  }
}
