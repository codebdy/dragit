import React, { useEffect } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { openSuccessAlertAction } from "store/alertbar/actions";
import { useDispatch } from "react-redux";


export function useMountedAxios<T>(config?:AxiosRequestConfig, mountedRef?:any ,tipSuccess?:string|true):[T|undefined, boolean, boolean]{
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(config){
      setLoading(true);
      axios( config ).then(res => {
        if(mountedRef?.current){
          setData(res.data);
          setLoading(false);
          tipSuccess && dispatch(openSuccessAlertAction())
        }
      })
      .catch(err => {
        console.log('server error:useMountedAxios', err);
        setLoading(false);
        setError(true);
      })       
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[config]);

  return[data as any, loading, error]
}