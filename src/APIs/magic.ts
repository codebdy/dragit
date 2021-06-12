import { AxiosRequestConfig } from "axios"

export const API_MAGIC_QUERY: AxiosRequestConfig = {
  url:'/get',
  method:'get',
}

export const API_MAGIC_POST: AxiosRequestConfig = {
  url:'/post',
  method:'post',
}

export const API_MAGIC_DELETE: AxiosRequestConfig = {
  url:'/delete',
  method:'post',
}