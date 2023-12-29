import 'reflect-metadata'
import { Container } from "inversify";
import HttpModule from '../modules/http/HttpModule';
import IoC from './IoC'
import TYPES from './Types'
import Server from './modules';

interface ISetupServer {
  server: Server
  container: Container
}

export const ioc = new IoC()

export const setupServer = async (): Promise<ISetupServer> => {
  const container = ioc.getContainer()
  ioc.build()

  container.bind<Container>(TYPES.Container).toConstantValue(container)

  const server = new Server()

  server.incluesModule(container.resolve(HttpModule))

  return {
    server,
    container,
  }
}

(async () => {
  const { server } = await setupServer()
  await server.run()
})()
