import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import  { useSWRInfinite } from "swr";
import { LOGIN_URL } from "Utils/consts";
import { fetcher } from "./fetcher";

export function useMagicQueryInfinite(getKey:(pageIndex: any, previousPageData: any)=>string){

  const history = useHistory();
  const rtValue = useSWRInfinite(getKey, fetcher);
  useEffect(()=>{
    if(rtValue?.error?.status === 401){
      history?.push(LOGIN_URL);
    }
  },[rtValue.error, history, rtValue])

  return rtValue;
}