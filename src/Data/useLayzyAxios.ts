import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export default function useLayzyAxios<T>(config?:AxiosRequestConfig)
  :{excute?:(config?:AxiosRequestConfig)=>void, loading?:boolean, data?:T, error?:string} 
{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const excute = (config2?:AxiosRequestConfig)=>{
    const theConfig = config2 || config;
    if(theConfig){
      setLoading(true);
      axios( theConfig ).then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Server error:useLayzyAxios', error);
        setLoading(false);
        setError(error.message);
      })       
    }

  }
  return {excute, loading, data, error};
}