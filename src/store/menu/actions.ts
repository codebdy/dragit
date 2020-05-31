import { createAction } from 'redux-actions';

const loadingAction = createAction('MENU_ITEMS_LOADING');
const requestFailureAction = createAction('MENU_ITEMS_REQUEST_FAILURE');
const receivedAction = createAction('RECEIVE_MENU_ITEMS');

export {
  loadingAction,
  requestFailureAction,
  receivedAction,
};