import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { axiosConfig } from "./axiosConfig";
import { serverUrl } from "./fetcher";

axios.defaults.baseURL = serverUrl

export default function useLayzyAxios<T>(
    config?:AxiosRequestConfig, 
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:any}] 
{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const excute = (config2?:AxiosRequestConfig)=>{
    
    if(config2 || config){
      setLoading(true);
      axios( {...config, ...config2, ...axiosConfig} ).then(res => {
        setData(res.data);
        setLoading(false);
        if(options?.onCompleted){
          options?.onCompleted(res.data as any);
        }        
      })
      .catch(error => {
        console.log('Server error:useLayzyAxios', error);
        setLoading(false);
        setError(error);
        if(options?.onError){
          options?.onError(error);
        }   
      })       
    }

  }
  return [excute, {loading, data, error}];
}