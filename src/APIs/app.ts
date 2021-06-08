import { AxiosRequestConfig } from "axios"

export const API_CREATE_RX_APP:AxiosRequestConfig = {
  url:'/create_rx_app',
  method:'post',
}

export const API_UPDATE_RX_APP:AxiosRequestConfig = {
  url:'/update_rx_app',
  method:'post',
}

export const API_REMOVE_RX_APP:AxiosRequestConfig = {
  url:'/remove_rx_app',
  method:'post',
}


export const API_GET_RX_APP_LIST:AxiosRequestConfig = {
  url:'/get_rx_app_listxxx',
  method:'get',
}

export const API_GET_RX_APP:AxiosRequestConfig = {
  url:'/get_rx_app',
  method:'get',
}