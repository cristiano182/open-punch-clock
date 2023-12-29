import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Company } from "@/domain/company/entity/Company";
import { ICreateCompany, ICreateCompanyParams, ICreateCompanyValidator } from "@/domain/company/interfaces";
import TYPES from "../../infra/ioc/Types";

@injectable()
export default class CreateCompany implements ICreateCompany {
    constructor(
        @inject(TYPES.CreateCompanyValidator) private createCompanyValidator: ICreateCompanyValidator
    ) {}
    async execute(props: ICreateCompanyParams): Promise<Company> {
    await this.createCompanyValidator.execute(props)
    return  {name: "teste" } as Company;
    }
 
}