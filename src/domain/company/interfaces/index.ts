import { IUseCaseValidator } from "@/domain/@common/generic-validator";
import { Company } from "../entity/Company";


export interface ICreateCompany {
 execute: (props: ICreateCompanyParams) => Promise<Company>;
}

export type ICreateCompanyValidator = IUseCaseValidator<Company, ICreateCompanyParams>



export type ICreateCompanyParams = Omit<Company, "id">