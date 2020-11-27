
//列表页返回分页数据的接口
export interface IPaginate{
  total:number,
  perPage:number,
  currentPage:number,
  from?:number,
  to?:number,
  data?:Array<any>,//列表数据
}