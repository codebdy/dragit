import { API_GET_APP_INFO } from "APIs/app";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setAppInfoAction } from "store/app/actions";
import useAppInfo from "store/app/useAppInfo";
import { LOGIN_URL, TOKEN_NAME } from "utils/consts";
import { useAxios } from "./useAxios";

export function useAuthCheck() {
  const [request, setRequest] = useState<AxiosRequestConfig>();
  const appInfo = useAppInfo();
  const [localToken] = useState(localStorage.getItem(TOKEN_NAME));
  const lastAppInfo = useAxios(request);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!appInfo && !localToken){
      history.push(LOGIN_URL);
    }
    if(!appInfo && localToken){
      setRequest(API_GET_APP_INFO);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appInfo, localToken])

  useEffect(()=>{
    if(!appInfo && lastAppInfo){
      dispatch(setAppInfoAction(lastAppInfo))      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAppInfo])

}