import 'reflect-metadata'

import TYPES from "../../../../@common/Types"
import { FastifyInstance, FastifyReply } from "fastify"
import { inject, injectable } from "inversify"
import { IController } from "../../../../@common/interfaces/IController"
import { IAuthentication } from '../../../authentication/authentication'
import { MyRequest } from '../../../../@common/interfaces/IHttpRequest'
import { IListCompany } from '../../../../../domain/company/interfaces/IListCompany'




@injectable()
export default class ListCompanyController implements IController {
    constructor(
        @inject(TYPES.ListCompany) private listCompany: IListCompany,
        @inject(TYPES.Authentication) private authentication: IAuthentication
    ) {}
    

    async execute(httpInstance: any): Promise<FastifyInstance> {
        return httpInstance.get('/', async (request: MyRequest<{}> , reply: FastifyReply) => {
           await this.authentication.execute(request)
            reply.code(200).send(await this.listCompany.execute())
        })
    }

}


  