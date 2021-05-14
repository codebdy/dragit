import { useEffect } from "react";
import { useDragItStore } from "./useDragItStore";
import { TOKEN_NAME, LOGIN_URL } from "Utils/consts";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "Data/fetcher";
import { API_ME } from "APIs/auth";

export function useLoginCheck() {
  const localToken = localStorage.getItem(TOKEN_NAME);
  const history = useHistory();
  const appStore = useDragItStore();
  const { data: user, error } = useSWR(API_ME.url, fetcher);

  useEffect(()=>{
    appStore.setLoggedUser(user);
  },[appStore, user])
  
  useEffect(()=>{
    if(error?.status === 401){
      history?.push(LOGIN_URL);
    }
  },[error, history])

  useEffect(()=>{
    if(!appStore.loggedUser && !localToken){
      console.log('useLoginCheck',appStore.loggedUser, localToken, LOGIN_URL)
      history?.push(LOGIN_URL);
    }
    if(!appStore.loggedUser && localToken){      
      //client.setLink(creatLink(localToken));
      //excuteQuery()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

}