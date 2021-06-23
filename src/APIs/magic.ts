import { AxiosRequestConfig } from "axios"

export const API_MAGIC_QUERY: AxiosRequestConfig = {
  url:'/get',
  method:'get',
}

export const API_MAGIC_POST: AxiosRequestConfig = {
  url:'/post',
  method:'post',
}

export const API_MAGIC_UPLOAD: AxiosRequestConfig = {
  url:'/upload',
  method:'post',
}

export const API_MAGIC_DELETE: AxiosRequestConfig = {
  url:'/delete',
  method:'post',
}

export const API_MAGIC_UPDATE: AxiosRequestConfig = {
  url:'/update',
  method:'post',
}