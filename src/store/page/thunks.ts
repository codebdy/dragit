import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';

import {loadingSchemaAction, receivedSchemaAction, requestSchemaFailureAction} from './actions'

const thunkPageSchema = (pageId:string
): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    dispatch(loadingSchemaAction(pageId))

    axios.get('/api/page/' + pageId).then(res => {
      dispatch(receivedSchemaAction(res.data));
    })
    .catch(err => {
      console.log('chunk error');
      dispatch(requestSchemaFailureAction(err.message));
    });
  }
};

export {
  thunkPageSchema,
};