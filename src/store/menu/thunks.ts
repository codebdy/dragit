import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';

import {loadingAction, receivedAction, requestFailureAction} from './actions'

const thunkMenuItems = (
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
};