import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';

import {receivedAction, requestFailureAction, loadingAction} from './actions'

const thunkIntl = (lang:string = 'zh-CN'
): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    dispatch(loadingAction())
    axios.get(`locales/${lang}.json`).then(res => {
      dispatch(receivedAction(
        {
          currentLocale:lang,
          locals: res.data
        }
        
      ));
    })
    .catch(err => {
      console.log('error get intl')
      dispatch(requestFailureAction(err.message));
    });
  }
};

export {
  thunkIntl,
};