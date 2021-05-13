import { AxiosRequestConfig } from "axios"

const API_LOGIN : AxiosRequestConfig= {
  url:'/api/login',
  method:'post',
}

const API_ME : AxiosRequestConfig= {
  url:'/api/me',
  method:'get',
}

export { 
  API_LOGIN,
  API_ME
}