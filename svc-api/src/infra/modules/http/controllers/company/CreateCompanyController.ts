import 'reflect-metadata'

import TYPES from "../../../../@common/Types"
import { FastifyInstance, FastifyReply } from "fastify"
import { inject, injectable } from "inversify"
import { IController } from "../../../../@common/interfaces/IController"
import { CreateCompanySchema } from "./schemas/CreateCompanySchema"
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../@common/interfaces/IHttpRequest'
import { ICreateCompany, ICreateCompanyParams } from '@domain/company/interfaces'




@injectable()
export default class CreateCompanyController implements IController {
    constructor(
        @inject(TYPES.CreateCompany) private createCompany: ICreateCompany,
        @inject(TYPES.Authentication) private authentication: IAuthentication
    ) {}
    

    async execute(httpInstance: any): Promise<FastifyInstance> {
        return httpInstance.post('/', CreateCompanySchema, async (request: MyRequest<ICreateCompanyParams> , reply: FastifyReply) => {
           await this.authentication.execute(request)
            const params = request.body
            reply.code(201).send(await this.createCompany.execute(params))
        })
    }

}


  