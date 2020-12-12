import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';

import {setAppInfoAction} from './actions'
import { API_GET_APP_INFO } from "APIs/app";

const thunkAppInfo = (token?:string): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    console.log('thunkAppInfo');
    axios({...API_GET_APP_INFO, params:{token}}).then(res => {
      dispatch(setAppInfoAction(res.data));
    })
    .catch(err => {
      console.log('chunk error');
    });
  }
};


export {
  thunkAppInfo
};