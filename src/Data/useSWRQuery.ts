import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSWR, { SWRResponse } from "swr";
import { LOGIN_URL } from "Utils/consts";
import { DataError } from "./DataError";
import { fetcher } from "./fetcher";

export function useSWRQuery<Data>(api:AxiosRequestConfig):SWRResponse<Data, DataError>&{loading?:boolean}{
  const history = useHistory();
  const rtValue = useSWR<Data, DataError>(api.url||'', fetcher);
  useEffect(()=>{
    if(rtValue?.error?.status === 401){
      history?.push(LOGIN_URL);
    }
  },[rtValue.error, history, rtValue])

  return {...rtValue, loading: !rtValue.data && !rtValue.error};
}