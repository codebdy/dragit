import { AxiosRequestConfig } from "axios"

const API_GET_DRAWER : AxiosRequestConfig= {
  url:'/api/drawer',
  method:'get',
}

const API_SAVE_DRAWER : AxiosRequestConfig= {
  url:'/api/save-drawer',
  method:'post',
}


export { API_GET_DRAWER, API_SAVE_DRAWER}
