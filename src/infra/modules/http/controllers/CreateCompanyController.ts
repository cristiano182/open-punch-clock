import { ICreateCompany, ICreateCompanyParams } from "@/domain/company/interfaces"
import TYPES from "../../../ioc/Types"
import { FastifyInstance, FastifyReply } from "fastify"
import { inject, injectable } from "inversify"
import { IController } from "../../../../infra/global/interfaces/IController"
import { CreateCompanySchema } from "./schemas/CreateCompanySchema"



@injectable()
export default class CreateCompanyController implements IController {
    constructor(
        @inject(TYPES.CreateCompany) private createCompany: ICreateCompany
    ) {}

    async execute(httpInstance: any): Promise<FastifyInstance> {
        return httpInstance.post('/', CreateCompanySchema, async (request: {body: ICreateCompanyParams}, reply: FastifyReply) => {
            const params = request.body
            reply.code(201).send(await this.createCompany.execute(params))
        })
    }

}


  