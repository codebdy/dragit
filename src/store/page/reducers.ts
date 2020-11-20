import { Action, handleActions } from 'redux-actions';
import {setModelLoadingAction, setModelAction} from "./actions";

const initialState:{
  modelLoading:boolean,
  model:any,
} = {
    modelLoading: false,
    model:undefined,
  };

type State = typeof initialState

const actionMap={
  [setModelLoadingAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      modelLoading: action.payload,
    };
  },
  [setModelAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      model: action.payload,
    };
  },
}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
