import { Action, handleActions } from 'redux-actions';
import {loadingSchemaAction, receivedSchemaAction, requestSchemaFailureAction} from "./actions";
import { RXElement } from 'views/Page/RXElement';
import { parseElements } from 'views/Page/jsonParser';

const initialState:
{
  schemaLoading:boolean, 
  dataLoading:boolean,
  pageId:string,
  schema?:Array<RXElement>,
  data:any,
  requestError:any
} = 
  {
    schemaLoading: false,
    dataLoading: false,
    pageId:'',
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
      schema: parseElements(action.payload),
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
