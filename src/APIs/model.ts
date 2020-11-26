import { AxiosRequestConfig } from "axios"

type Order = 'asc' | 'desc';
export interface FieldOrder{
  field:string;
  direction: Order;
}

export interface IOperateListParam{
  command: string | 'query',
  keywords?: string,
  filterValues?: Array<string>,
  orders?: Array<FieldOrder>,
  selected?: Array<number>,
  rowsPerPage: number,
  page:number,//第几页
}

//全部列出Model，常用于下拉选择等
const API_LIST_MODEL : AxiosRequestConfig= {
  url:'/api/data/list_model',
  method:'get',
}

//查询Mdoel，用于列表页显示，提供查询、分页等功能
const API_QUERY_AND_OPERATE_MODELS: AxiosRequestConfig= {
  url:'/api/data/query-operate-models',
  method:'post',
}

const API_GET_MODEL_BY_ID : AxiosRequestConfig= {
  url:'/api/data/model',
  method:'get',
}

export function createListOperateRequest(config:AxiosRequestConfig, data:IOperateListParam){
  return {...config, data:{...config.data, ...data}};
}

export { 
  API_LIST_MODEL, 
  API_QUERY_AND_OPERATE_MODELS,
  API_GET_MODEL_BY_ID
}