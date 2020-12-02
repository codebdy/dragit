import { AxiosRequestConfig } from "axios"

const API_GET_MODEL_TREE : AxiosRequestConfig= {
  url:'/api/data/get-model-tree',
  method:'get',
}

const API_SAVE_MODEL_TREE : AxiosRequestConfig= {
  url:'/api/data/save-model-tree',
  method:'post',
}


export { API_GET_MODEL_TREE, API_SAVE_MODEL_TREE}
