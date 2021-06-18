import axios, { AxiosRequestConfig } from "axios";
import { serverUrl } from "./serverConfig";
import { DataError } from "./DataError";
import useLayzyAxios from "./useLayzyAxios";
import { API_MAGIC_DELETE } from "APIs/magic";

axios.defaults.baseURL = serverUrl

export default function useLayzyMagicDelete<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLayzyAxios(API_MAGIC_DELETE, options);
  return rtValue;
}