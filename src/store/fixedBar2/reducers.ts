import { handleAction, Action } from 'redux-actions';
import {closeFixedBarAction, openFixedBarAction} from "./actions";

const initialState = {
  open: true,
};

type State = typeof initialState

const closeIt = handleAction(closeFixedBarAction, (state, action) => {
  return {
    ...state,
    open: false,
  };
}, initialState);

const openIt = handleAction(openFixedBarAction, (state, action) => {
  return {
    ...state,
    open: true,
  };
}, initialState);

function reducer(
  state = initialState,
  action: Action<any>
): State {
  
  if(action.type === closeFixedBarAction().type){
    return closeIt(state, action)
  }
  if(action.type === openFixedBarAction().type){
    return openIt(state, action)
  }

  return state
}

export default reducer;
