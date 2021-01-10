
//列表页返回分页数据的接口
export interface IPaginate{
  count?:number;
  currentPage?:number;
  hasMorePages?:boolean;
  lastPage?:number;
  perPage?:number;
  total?:number;
}