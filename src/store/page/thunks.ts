import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';
import {loadingSchemaAction, receivedSchemaAction, requestSchemaFailureAction, requestModelFailureAction, loadingModelAction, receivedModelAction} from './actions'
import { PageJumper } from "admin/views/Page/FormAction";

interface AxiosAction{
  method:'get'|'GET'|'post'|'POST',
  url:string,
  data:{
    [key:string]:string,
  },
}

const thunkPageSchema = (page:PageJumper
): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    if(!page.pageId){
      return dispatch(thunkModuleDefaultPageSchema(page))
    }
    dispatch(loadingSchemaAction(page.pageId))

    axios.get('/api/page/' + page.pageId).then(res => {
      dispatch(receivedSchemaAction(res.data));
      //获取页面数据
      const axiosAction = res.data.initAction;
      axiosAction && dispatch(thunkPageModel({...axiosAction, data:{...axiosAction.data, dataId:page.dataId} }));
    })
    .catch(err => {
      console.log('chunk error');
      dispatch(requestSchemaFailureAction(err.message));
    });
  }
};

const thunkModuleDefaultPageSchema = (page:PageJumper
  ): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    dispatch(loadingSchemaAction())
    axios.get('/api/moudle-index/' + page.moduleId).then(res => {
      dispatch(thunkPageSchema({...page, pageId:res.data}));
    })
    .catch(err => {
      console.log('chunk error');
      dispatch(requestSchemaFailureAction(err.message));
    });
  }
};

const thunkPageModel = (action:AxiosAction
  ): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    dispatch(loadingModelAction())
    axios(action).then(res => {
      dispatch(receivedModelAction(res.data));
    })
    .catch(err => {
      console.log('chunk error');
      dispatch(requestModelFailureAction(err.message));
    });
  }
};

export {
  thunkPageSchema,
  thunkModuleDefaultPageSchema,
  thunkPageModel
};