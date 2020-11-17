import { AxiosRequestConfig } from "axios"

const API_GET_MODULES : AxiosRequestConfig= {
  url:'/api/modules',
  method:'get',
}

const API_CHANGE_MODULE : AxiosRequestConfig= {
  url:'/api/change-module',
  method:'post',
}

const API_REMOVE_MODULE : AxiosRequestConfig= {
  url:'/api/remove-module',
  method:'post',
}

const API_ADD_MODULE : AxiosRequestConfig= {
  url:'/api/add-module',
  method:'post',
}

export { 
  API_GET_MODULES,
  API_CHANGE_MODULE, 
  API_REMOVE_MODULE,
  API_ADD_MODULE
}
