import 'reflect-metadata'
import TYPES from '../../@common/Types'
import { Container, inject, injectable } from 'inversify'
import { MyRequest } from '../../@common/interfaces/IHttpRequest';


export interface IAuthentication {
    execute(request: MyRequest<unknown>): Promise<any>;
}


@injectable()
export default class Authentication implements IAuthentication {
    constructor(@inject(TYPES.Container) readonly container: Container) {}
    async execute(request: MyRequest<unknown>): Promise<void> {
        request.headers
        console.log("authentication called")
    return;
    } 
}



