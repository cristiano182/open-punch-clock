import { Company } from "../entity/Company";


export interface IListCompany {
 execute: () => Promise<Company[]>;
}

export interface ListCompanyValidator  {
execute: () => Promise<Company>;
}
