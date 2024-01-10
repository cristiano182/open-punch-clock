import { ICreateCompanyParams } from "../interfaces";
import { Fixture as Fix } from "class-fixtures-factory";

export class Company {
   @Fix() id: string;
   @Fix() name: string;
   @Fix() document: string;
   @Fix() createdAt: Date;
   @Fix() updatedAt: Date;


   static create(company: ICreateCompanyParams): Company {
       const obj = Object.assign(new Company(), company)
       obj.createdAt = new Date()
       obj.updatedAt = new Date()
       return obj;
    }
}