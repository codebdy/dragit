import { useContext } from 'react';
import { useHistory } from 'react-router';
import { LOGIN_URL } from 'utils/consts';
import { AppStoreContext } from './AppStoreProdivider';
import { LoggedUser } from './LoggedUser';

export const useLoggedUser = (): LoggedUser | undefined => {
  const history = useHistory();
  const loggedUser = useContext(AppStoreContext).loggedUser;
  if(!loggedUser){
    history.push(LOGIN_URL);
    return;
  }
  return new LoggedUser(loggedUser);
};
