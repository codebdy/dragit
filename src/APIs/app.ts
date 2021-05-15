import { AxiosRequestConfig } from "axios"

export const API_CREATE_RX_APP:AxiosRequestConfig = {
  url:'/create_rx_app',
  method:'post',
}

export const API_GET_RX_APP_LIST:AxiosRequestConfig = {
  url:'/get_rx_app_list',
  method:'get',
}
