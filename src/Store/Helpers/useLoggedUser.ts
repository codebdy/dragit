import { useContext } from 'react';
import { DragItStoreContext } from './DragItStoreProvider';
import { LoggedUser } from './LoggedUser';

export const useLoggedUser = (): LoggedUser => {
  const loggedUser = useContext(DragItStoreContext).loggedUser;
  return new LoggedUser(loggedUser);
};
