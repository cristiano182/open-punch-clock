
import "reflect-metadata";
import { injectable } from "inversify";
import { Company } from "../../../domain/company/entity/Company";
import { ICreateCompanyParams } from "../../../domain/company/interfaces";
import { ICustomErrorField, InvalidCompanyDocument } from "../../../domain/company/exceptions/errors";
import { ErrorCode } from "../../../domain/company/exceptions/errorsCode";

@injectable()
export default class CreatePersonValidator {
    constructor() {}
     async execute(props: ICreateCompanyParams) : Promise<Company> {
    const error: ICustomErrorField = {code: ErrorCode.INVALID_VALUE, message: 'Invalid Company Document', field: 'document'}
    if(!props.document) throw new InvalidCompanyDocument(error)
    return  {name: "teste" } as Company;
    }
 
}