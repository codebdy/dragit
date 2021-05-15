import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSWR, { SWRResponse } from "swr";
import { LOGIN_URL } from "Utils/consts";
import { fetcher } from "./fetcher";

export class QueryError{
  stack?: string;
  message?: String;
  status?: number;
}

export function useSWRQuery<Data>(api:AxiosRequestConfig):SWRResponse<Data, QueryError>&{loading?:boolean}{
  const history = useHistory();
  const rtValue = useSWR<Data, QueryError>(api.url||'', fetcher);
  useEffect(()=>{
    if(rtValue?.error?.status === 401){
      history?.push(LOGIN_URL);
    }
  },[rtValue.error, history, rtValue])

  return {...rtValue, loading: !rtValue.data && !rtValue.error};
}