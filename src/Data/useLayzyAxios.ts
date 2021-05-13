import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export default function useLayzyAxios<T>(config?:AxiosRequestConfig)
  :{excute?:()=>void, loading?:boolean, data?:T, error?:string} 
{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const excute = ()=>{
    if(config){
      setLoading(true);
      axios( config ).then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('server error:useLayzyAxios', error);
        setLoading(false);
        setError(error.message);
      })       
    }

  }
  return {excute, loading, data, error};
}