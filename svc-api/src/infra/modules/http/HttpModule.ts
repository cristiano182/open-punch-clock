import 'reflect-metadata'
import Fastify, { FastifyInstance } from 'fastify'
import { Container, injectable } from 'inversify'
import getFilesFromPath from '../../utils/path'
import IModule from '../../server/modules'





@injectable()
export default class HttpModule extends IModule {
  private fastify = Fastify({logger: true})


  static async build(container: Container): Promise<HttpModule> {
    const module = new HttpModule(container);
    return module;
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
      const controllers = await getFilesFromPath<any>([__dirname, 'controllers/', '*', '*Controller.(t|j)s'])
      for (const { name, file } of controllers) {
       this.container.bind(Symbol.for(name)).to(file)
       const controller: any =  await this.container.get(Symbol.for(name))
       this.fastify.register((fastifyInstance: FastifyInstance) => controller.execute(fastifyInstance))
      }
    } 
}

