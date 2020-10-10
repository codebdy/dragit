import { handleAction, Action } from 'redux-actions';
import {openSuccessAlertAction, closeSuccessAlertAction} from "./actions";

const initialState = {
  successAlertOpen: false,
};

type State = typeof initialState

const open = handleAction(openSuccessAlertAction, (state, action) => {
  return {
    ...state,
    successAlertOpen: true,
  };
}, initialState);

const close = handleAction(closeSuccessAlertAction, (state, action) => {
  return {
    ...state,
    successAlertOpen: false,
  };
}, initialState);

function reducer(
  state = initialState,
  action: Action<any>
): State {
  if(action.type === openSuccessAlertAction().type){
    
    return open(state, action)
  }
  if(action.type === closeSuccessAlertAction().type){
    return close(state, action)
  }

  return state
}

export default reducer;
