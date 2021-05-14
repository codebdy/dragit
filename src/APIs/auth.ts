import { AxiosRequestConfig } from "axios"

const API_LOGIN : AxiosRequestConfig= {
  url:'/login',
  method:'post',
}

const API_ME  = {
  url:'/me',
  method:'get',
}

export { 
  API_LOGIN,
  API_ME
}