import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from 'axios';


export function useAxios<T>(config?:AxiosRequestConfig, tipSuccess?:string|boolean):[T|undefined, boolean, boolean]{
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>();
  const [error, setError] = useState(false);
  let destroied = false;
  //const dispatch = useDispatch();
  useEffect(() => {
    if(config){
      setLoading(true);
      axios( config ).then(res => {
        if(!destroied){
          setData(res.data);
          setLoading(false);
          //tipSuccess && dispatch(openSuccessAlertAction())          
        }
      })
      .catch(error => {
        console.log('server error:useAxios', error);
        setLoading(false);
        setError(true);
        //dispatch(openErrorDialogAction(error.message))
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