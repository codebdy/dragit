import { AxiosRequestConfig } from "axios"

//全部列出Model，常用于下拉选择等
const API_LIST_MODEL : AxiosRequestConfig= {
  url:'/api/data/list_model',
  method:'get',
}

//查询Mdoel，用于列表页显示，提供查询、分页等功能
const API_QUERY_MODELS: AxiosRequestConfig= {
  url:'/api/data/query-models',
  method:'post',
}

const API_GET_MODEL_BY_ID : AxiosRequestConfig= {
  url:'/api/data/model',
  method:'get',
}

export { API_LIST_MODEL, API_QUERY_MODELS, API_GET_MODEL_BY_ID}