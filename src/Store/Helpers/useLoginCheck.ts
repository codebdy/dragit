import { useEffect } from "react";
import { useDragItStore } from "./useDragItStore";
import { TOKEN_NAME, LOGIN_URL } from "Utils/consts";
import { useHistory } from "react-router-dom";
import { API_ME } from "APIs/auth";
import { IUser } from "Base/Model/IUser";
import { useSWRQuery } from "Data/useSWRQuery";

export function useLoginCheck() {
  const localToken = localStorage.getItem(TOKEN_NAME);
  const history = useHistory();
  const appStore = useDragItStore();
  const { data: user } = useSWRQuery<IUser>(API_ME);

  useEffect(()=>{
    appStore.setLoggedUser(user);
  },[appStore, user])

  useEffect(()=>{
    if(!appStore.loggedUser && !localToken){
      console.log('useLoginCheck',appStore.loggedUser, localToken, LOGIN_URL)
      history?.push(LOGIN_URL);
    }
    //if(!appStore.loggedUser && localToken){      
      //client.setLink(creatLink(localToken));
      //excuteQuery()
    //}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

}