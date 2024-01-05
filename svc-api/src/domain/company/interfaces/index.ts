import { IUseCaseValidator } from "@/domain/@common/generic-validator";
import { Company } from "../entity/Company";


export interface ICreateCompany {
 execute: (props: ICreateCompanyParams) => Promise<Company>;
}

export interface ICreateCompanyValidator  {
execute: (params: ICreateCompanyParams) => Promise<Company>;
}

export type ICreateCompanyParams = Omit<Company, "id">