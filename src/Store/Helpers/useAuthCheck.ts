import { useHistory } from "react-router";
import { ID } from "rx-drag/models/baseTypes";
import { LOGIN_URL, TOKEN_NAME } from "Utils/consts";
import { useDragItStore } from "./useDragItStore";
import { useLoggedUser } from "./useLoggedUser";

export function useAuthCheck(...auths:ID[]){
  const loggedUser = useLoggedUser();
  const appStore = useDragItStore()
  const history = useHistory();
  if(!loggedUser || !loggedUser.authCheck(...auths)){
    appStore.setLoggedUser(undefined);
    localStorage.removeItem(TOKEN_NAME);
    history.push(LOGIN_URL);    
  }
}

