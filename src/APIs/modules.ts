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

const API_GET_MODULE_BY_ID : AxiosRequestConfig= {
  url:'/api/get-module-by-id',
  method:'get',
}

const API_UPDATE_MODULE_PAGE : AxiosRequestConfig= {
  url:'/api/update-module-page',
  method:'post',
}

const API_REMOVE_MODULE_PAGE : AxiosRequestConfig= {
  url:'/api/remove-page-of-module',
  method:'post',
}

const API_ADD_MODULE_PAGE : AxiosRequestConfig= {
  url:'/api/add-page-of-module',
  method:'post',
}

const API_UPDATE_MODULE_INDEX_PAGE : AxiosRequestConfig= {
  url:'/api/update-index-page-of-module',
  method:'post',
}

const API_GET_PAGE : AxiosRequestConfig= {
  url:'/api/get-page/',
  method:'get',
}

const API_GET_MODULE_INDEX_PAGE : AxiosRequestConfig= {
  url:'/api/get-module-index-page',
  method:'get',
}

const API_ADD_MODULE_AUTH : AxiosRequestConfig= {
  url:'/api/add-auth-of-module',
  method:'post',
}

const API_UPDATE_MODULE_AUTH : AxiosRequestConfig= {
  url:'/api/update-module-auth',
  method:'post',
}

const API_REMOVE_MODULE_AUTH : AxiosRequestConfig= {
  url:'/api/remove-auth-of-module',
  method:'post',
}


export { 
  API_GET_MODULES,
  API_CHANGE_MODULE, 
  API_REMOVE_MODULE,
  API_ADD_MODULE,
  API_GET_MODULE_BY_ID,
  API_UPDATE_MODULE_PAGE,
  API_REMOVE_MODULE_PAGE,
  API_ADD_MODULE_PAGE,
  API_UPDATE_MODULE_INDEX_PAGE,
  API_GET_PAGE,
  API_GET_MODULE_INDEX_PAGE,

  API_ADD_MODULE_AUTH,
  API_UPDATE_MODULE_AUTH,
  API_REMOVE_MODULE_AUTH
}