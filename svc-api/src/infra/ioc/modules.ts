export interface IModule {
    configurations<T>(): Promise<T | void> | T | void
    start(): Promise<void> | void
    stop(): Promise<void> | void
  }
  

export default class Server {
  private modules: IModule[]

  constructor() {
    this.modules = new Array<IModule>()
  }

  incluesModule(module: IModule): void {
    this.modules.push(module)
  }

  async run(): Promise<void> {
    for await (const module of this.modules) {
      await module.configurations()
      await module.start()
    }
  }

  async stop(): Promise<void> {
    const promises = new Set()
    for (const module of this.modules) {
      promises.add(module.stop())
    }
    await Promise.all(promises)
  }
}
