import { Company } from "@/domain/company/entity/Company";
import { ICreateCompany, ICreateCompanyParams } from "@/domain/company/interfaces";


export default class CreateCompany implements ICreateCompany {
    constructor() {}
     async execute(props: ICreateCompanyParams) : Promise<Company> {

    return  {name: "teste" } as Company;
    }
 
}