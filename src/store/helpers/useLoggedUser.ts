import { useContext } from 'react';
import { AppStoreContext } from './AppStoreProdivider';
import { LoggedUser } from './LoggedUser';

export const useLoggedUser = (): LoggedUser => {
  const loggedUser = useContext(AppStoreContext).loggedUser;
  return new LoggedUser(loggedUser);
};
