import { IInsuranceLead } from "./IInsuranceLead";

export interface IInsuranceDetail {
    pageData: IInsuranceLead[];
    limit: number;
    page: number;
    pages: number;
    total: number;
  }
  
  export class InsuranceDetail implements IInsuranceDetail {
    pageData = [];
    limit = 0;
    page = 0;
    pages = 0;
    total = 0;
  }