import { useContext } from 'react';
import { DragItContext } from './DragItStoreProvider';
import { LoggedUser } from './LoggedUser';

export const useLoggedUser = (): LoggedUser => {
  const loggedUser = useContext(DragItContext).loggedUser;
  return new LoggedUser(loggedUser);
};
