import { Action, handleActions } from 'redux-actions';
import {loadingSchemaAction, receivedSchemaAction, requestSchemaFailureAction, loadingModelAction, receivedModelAction} from "./actions";
import { RXElement } from 'admin/views/Page/RXElement';
import { parseElements } from 'admin/views/Page/jsonParser';

const initialState:
{
  schemaLoading:boolean, 
  modelLoading:boolean,
  pageId:string,
  pageJson:any,
  schema?:Array<RXElement>,
  model:any,
  requestError:any
} = 
  {
    schemaLoading: false,
    modelLoading: false,
    pageId:'',
    pageJson:undefined,
    schema:undefined,
    model:undefined,
    requestError:undefined,
  };

type State = typeof initialState


const actionMap={
  [loadingSchemaAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      schemaLoading: true,
      pageId:action.payload,
    };
  },

  [receivedSchemaAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      schemaLoading: false,
      pageJson:action.payload,
      schema: parseElements(action.payload.layout),
    };
  },

  [requestSchemaFailureAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      schemaLoading: false,
      requestError: action.payload,
    };
  },

  [loadingModelAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      modelLoading: false,
    };
  },
  [receivedModelAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      modelLoading: false,
      model: action.payload,
    };
  },
  [requestSchemaFailureAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      modelLoading: false,
      requestError: action.payload,
    };
  },

}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
