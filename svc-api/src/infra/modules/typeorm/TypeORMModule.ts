import 'reflect-metadata'
import TYPES from '../../common/types/Types'
import { Container, injectable } from 'inversify'
import { DataSource } from 'typeorm'
import datasource from './configs/datasource'
import readFilesFromPath from '../../utils/path'
import Module from '../../global/interfaces/IModule'

@injectable()
export default class TypeORMModule extends Module {
  static async build(container: Container): Promise<TypeORMModule> {
    const module = new TypeORMModule(container)
    await module.configurations()
    return module
  }

  stop(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async configurations(): Promise<void> {
    const connection = await new DataSource(datasource).initialize()
    this.container.bind<DataSource>(TYPES.TypeORMConnection).toConstantValue(connection)
    await connection.runMigrations()
    return
  }

  async start(): Promise<void> {
    const repositories = await readFilesFromPath<any>([__dirname, 'repositories', '*Repository.(t|j)s'])
    for (const { name, file: repo } of repositories) {
      this.container.bind(Symbol.for(name)).to(repo)
    }
  }
}
