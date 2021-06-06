import { AxiosRequestConfig } from "axios"

const API_LOGIN : AxiosRequestConfig= {
  url:'/auth/login',
  method:'post',
}

const API_ME : AxiosRequestConfig = {
  url:'/auth/me',
  method:'get',
}

export { 
  API_LOGIN,
  API_ME
}