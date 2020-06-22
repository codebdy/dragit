import { Action, handleActions } from 'redux-actions';
import {loadingSchemaAction, receivedSchemaAction, requestSchemaFailureAction} from "./actions";
import { RXElement } from 'admin/views/Page/RXElement';
import { parseElements } from 'admin/views/Page/jsonParser';

const initialState:
{
  schemaLoading:boolean, 
  dataLoading:boolean,
  pageId:string,
  pageJson:any,
  schema?:Array<RXElement>,
  data:any,
  requestError:any
} = 
  {
    schemaLoading: false,
    dataLoading: false,
    pageId:'',
    pageJson:undefined,
    schema:undefined,
    data:undefined,
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

}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
