import 'reflect-metadata'
import Fastify, { FastifyInstance } from 'fastify'
import { Container, injectable } from 'inversify'
import readFilesFromPath from '../../utils/path'
import Module from '../../global/interfaces/IModule'

@injectable()
export default class HttpModule extends Module {
  private fastify = Fastify({ logger: true })

  static async build(container: Container): Promise<HttpModule> {
    const module = new HttpModule(container)
    await module.configurations()
    return module
  }

  async start(): Promise<void> {
    try {
      await this.fastify.listen({ port: 3000 })
    } catch (err) {
      this.fastify.log.error(err)
      process.exit(1)
    }
  }

  async configurations(): Promise<void> {
    const controllers = await readFilesFromPath<any>([__dirname, 'controllers/', '*', '*Controller.(t|j)s'])
    for (const { name, file, group } of controllers) {
      this.container.bind(Symbol.for(name)).to(file)
      const controller: any = await this.container.get(Symbol.for(name))
      this.fastify.register((fastifyInstance: FastifyInstance) => controller.execute(fastifyInstance), {
        prefix: `/${group}`,
      })
    }
  }
}
