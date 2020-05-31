import { createAction } from 'redux-actions';
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";

const requestFailureAction = createAction('MENU_ITEMS_REQUEST_FAILURE');
const receivedAction = createAction('RECEIVE_MENU_ITEMS');

export {
  requestFailureAction,
  receivedAction,
};