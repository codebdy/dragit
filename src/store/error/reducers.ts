import { Action } from 'redux-actions';
import {openErrorDialogAction, closeErrorDialogAction} from "./actions";

const initialState = {
  errorMessage: '',
};

type State = typeof initialState

function reducer(
  state = initialState,
  action: Action<any>
): State {
  if(action.type === openErrorDialogAction().type){
    
    return {
      ...state,
      errorMessage: action.payload,
    }
  }
  if(action.type === closeErrorDialogAction().type){
    return {
      ...state,
      errorMessage: '',
    }
  }

  return state
}

export default reducer;
