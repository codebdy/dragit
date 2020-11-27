import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { openSuccessAlertAction } from "store/alertbar/actions";
import { useDispatch } from "react-redux";


export function useAxios<T>(config?:AxiosRequestConfig, tipSuccess?:string|boolean):[T|undefined, boolean, boolean]{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState(false);
  let destroied = false;
  const dispatch = useDispatch();
  useEffect(() => {
    if(config){
      setLoading(true);
      axios( config ).then(res => {
        if(!destroied){
          setData(res.data);
          setLoading(false);
          tipSuccess && dispatch(openSuccessAlertAction())          
        }
      })
      .catch(err => {
        console.log('server error:useAxios', err);
        setLoading(false);
        setError(true);
        //dispatch(openErrorDialogAction())
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