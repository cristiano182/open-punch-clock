import TYPES from "../../../@common/Types";
import { inject, injectable } from "inversify";
import { DataSource as Connection } from "typeorm";
import CompanyModel from "../schemas/Company";
import { Company } from "../../../../domain/company/entity/Company";
import { ICompanyRepositoriy } from "@domain/company/interfaces";

@injectable()
export default class CompanyRepository implements ICompanyRepositoriy {
  public constructor(@inject(TYPES.TypeORMConnection) private conn: Connection) {}

  async create(company: Company): Promise<Company> {
    return await this.conn.manager.save(CompanyModel, company)
  }


  async find(): Promise<Company[]> {
    const list = await this.conn.manager.find(CompanyModel)
    return list as unknown as Company[]
  }
}
