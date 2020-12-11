import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setAppInfoAction } from "store/app/actions";
import useLoggedUser from "store/app/useLoggedUser";
import { TOKEN_NAME, LOGIN_URL } from "utils/consts";

export function useAuthCheck(auths:string[]){
  const loggedUser = useLoggedUser();
  const history = useHistory();
  const dispatch = useDispatch();
  if(!loggedUser.authCheck(auths)){
    dispatch(setAppInfoAction(undefined));
    localStorage.removeItem(TOKEN_NAME);
    history.push(LOGIN_URL);    
  }
}

