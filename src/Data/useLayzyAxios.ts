import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_URL, TOKEN_NAME } from "Utils/consts";
import { axiosConfig } from "./axiosConfig";
import { serverUrl } from "./serverConfig";
import { DataError } from "./DataError";

axios.defaults.baseURL = serverUrl

export default function useLayzyAxios<T>(
    config?:AxiosRequestConfig, 
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const localToken = localStorage.getItem(TOKEN_NAME);
  const history = useHistory();
  
  const excute = (config2?:AxiosRequestConfig)=>{    
    if(config2 || config){
      setLoading(true);
      axiosConfig.headers.authorization = localToken ? `Bearer ${localToken}` : ""
      axios( {...axiosConfig, ...config, ...config2} ).then(res => {
        setData(res.data);
        setLoading(false);
        if(options?.onCompleted){
          options?.onCompleted(res.data as any);
        }        
      })
      .catch(error => {
        console.log('Server error:useLayzyAxios', error.message);
        setLoading(false);
        const dataError = {
          message: error.response?.data?.error || error.message, 
          status: error.response?.data?.message
        }
        setError(dataError);
        if(options?.onError){
          options?.onError(dataError);
        }
        if(error.response?.status === 401){
          history?.push(LOGIN_URL);
        }   
      })       
    }

  }
  return [excute, {loading, data, error}];
}