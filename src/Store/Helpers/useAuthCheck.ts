import { useHistory } from "react-router";
import { LOGIN_URL, TOKEN_NAME } from "Utils/consts";
import { useAppStore } from "./useAppStore";
import { useLoggedUser } from "./useLoggedUser";

export function useAuthCheck(...auths:string[]){
  const loggedUser = useLoggedUser();
  const appStore = useAppStore()
  const history = useHistory();
  if(!loggedUser || !loggedUser.authCheck(...auths)){
    appStore.setLoggedUser(undefined);
    localStorage.removeItem(TOKEN_NAME);
    history.push(LOGIN_URL);    
  }
}

