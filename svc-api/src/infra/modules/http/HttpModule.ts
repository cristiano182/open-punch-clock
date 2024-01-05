import 'reflect-metadata'
import { IModule } from '@/infra/ioc/modules'
import TYPES from '../../ioc/Types'
import Fastify, { FastifyInstance } from 'fastify'
import { Container, inject, injectable } from 'inversify'
import getFilesFromPath from '../../utils/path'


@injectable()
export default class HttpModule implements IModule {
    constructor(@inject(TYPES.Container) readonly container: Container) {}
    private fastify = Fastify({ logger: true })

  async start(): Promise<void> {
    try { 
    await this.fastify.listen({ port: 3000 })
    } catch (err) {
     this.fastify.log.error(err)
     process.exit(1)
    }
    }

    stop() {}

    async configurations(): Promise<void> {
      const controllers = await getFilesFromPath<any>([__dirname, 'controllers', '*Controller.(t|j)s'])
      for (const { name } of controllers) {
       const controller: any =  await this.container.get(Symbol.for(name))
       this.fastify.register((fastifyInstance: FastifyInstance) => controller.execute(fastifyInstance))
      }
      } 
}



