type Order = 'asc' | 'desc';
export interface FieldOrder{
  field:string;
  direction: Order;
}

export interface IQueryParam{
  keywords?: string,
  filterValues?: Array<string>,
  orders?: Array<FieldOrder>,
  first: number,
  page:number,//第几页
}
