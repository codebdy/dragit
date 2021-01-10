import { useHistory } from "react-router";
import { useLoggedUser } from "store1/helpers1/useLoggedUser";
import { TOKEN_NAME, LOGIN_URL } from "utils/consts";
import { useAppStore } from "./useAppStore";

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

