import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "store";
import axios from 'axios';
import {loadingSchemaAction, receivedSchemaAction, requestSchemaFailureAction, requestModelFailureAction, loadingModelAction, receivedModelAction} from './actions'
import { PageJumper } from "admin/views/Page/PageAction";

interface AxiosAction{
  method:'get'|'GET'|'post'|'POST',
  url:string,
  data:{
    [key:string]:string,
  },
}
var cache : {[key: string]: any }= {};

const thunkPageSchema = (page:PageJumper
): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    if(!page.pageId){
      return dispatch(thunkModuleDefaultPageSchema(page))
    }

    const url = '/api/page/' + page.pageId;

    if(cache[url]){
      fetchModelData(cache[url], dispatch, page);
      return
    }
    
    dispatch(loadingSchemaAction(page.pageId))

    axios.get(url).then(res => {
      //获取页面数据
      cache[url] = res.data;
      fetchModelData(res.data, dispatch, page);
    })
    .catch(err => {
      console.log('chunk error');
      dispatch(requestSchemaFailureAction(err.message));
    });
  }
};

function fetchModelData(data:any, dispatch:any, page: PageJumper) {
  dispatch(receivedSchemaAction(data));
  const axiosAction = data.initAction;
  axiosAction && dispatch(thunkPageModel({ ...axiosAction, data: { ...axiosAction.data, dataId: page.dataId } }));
}


const thunkModuleDefaultPageSchema = (page:PageJumper
  ): ThunkAction<void, RootState, null, Action<string>> => {
  return async dispatch => {
    const url = '/api/moudle-index/' + page.moduleId;
    if(cache[url]){
      dispatch(thunkPageSchema({...page, pageId:cache[url]}));
      return;
    }
    
    dispatch(loadingSchemaAction())

    axios.get(url).then(res => {
      cache[url] = res.data;
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

