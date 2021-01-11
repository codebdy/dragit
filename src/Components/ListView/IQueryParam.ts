import { IFieldOrder } from "./IFieldOrder";

export interface IQueryParam{
  keywords?: string,
  filterValues?: Array<string>,
  orders?: Array<IFieldOrder>,
  first: number,
  page:number,//第几页
}
