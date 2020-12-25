type Order = 'asc' | 'desc';
export interface FieldOrder{
  field:string;
  direction: Order;
}

export interface IOperateListParam{
  command?: string | 'query',
  keywords?: string,
  filterValues?: Array<string>,
  orders?: Array<FieldOrder>,
  selected?: Array<number>,
  first: number,
  page:number,//第几页
}
