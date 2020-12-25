import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { useAppStore } from "store/helpers/useAppStore";


export function useAxios<T>(config?:AxiosRequestConfig, tipSuccess?:string|boolean):[T|undefined, boolean, boolean]{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState(false);
  const appStore = useAppStore();
  let destroied = false;
  useEffect(() => {
    if(config){
      setLoading(true);
      axios( config ).then(res => {
        if(!destroied){
          setData(res.data);
          setLoading(false);
          tipSuccess && appStore.setSuccessAlert(true);          
        }
      })
      .catch(error => {
        console.log('server error:useAxios', error);
        setLoading(false);
        setError(true);
        appStore.infoError(error.message);
      })       
    }

    return ()=>{
      // eslint-disable-next-line react-hooks/exhaustive-deps
      destroied = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[config]);

  return[data as any, loading, error]
}