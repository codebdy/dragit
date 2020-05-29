import { createAction } from 'redux-actions';
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';

const loadingAction = createAction('MENU_ITEMS_LOADING');
const requestFailureAction = createAction('MENU_ITEMS_REQUEST_FAILURE');
const receivedAction = createAction('RECEIVE_MENU_ITEMS');

const thunkMenuItems = (
  //message: string
): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    dispatch(loadingAction())

    axios.get('/api/drawer').then(res => {
      dispatch(receivedAction(res.data));
    })
    .catch(err => {
      dispatch(requestFailureAction(err.message));
    });
  }
};

export {
  thunkMenuItems,
  loadingAction,
  requestFailureAction,
  receivedAction,
};