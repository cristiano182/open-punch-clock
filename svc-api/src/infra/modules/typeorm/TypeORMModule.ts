import 'reflect-metadata'
import TYPES from '../../@common/Types'
import { Container, injectable } from 'inversify'
import { DataSource } from 'typeorm'
import datasource from './configs/datasource'
import getFilesFromPath from '../../utils/path'
import IModule from '../../server/modules'





@injectable()
export default class TypeORMModule extends IModule {
   
  static async build(container: Container): Promise<TypeORMModule> {
    const module = new TypeORMModule(container);
    return module;
  }

  async start(): Promise<void> {
    const connection = await new DataSource(datasource).initialize()
    await connection.runMigrations()
    this.container.bind<DataSource>(TYPES.TypeORMConnection).toConstantValue(connection)
    return;

  }

  async configurations(): Promise<void> {
      const repositories = await getFilesFromPath<any>([__dirname, 'repositories', '*Repository.(t|j)s'])
      for (const { name, file: repo } of repositories) {
      this.container.bind(Symbol.for(name)).to(repo)
      }
  } 
}



