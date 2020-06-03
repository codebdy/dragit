import { handleAction, Action } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction} from "./actions";

const initialState = {
  areaSelect: false,
};

type State = typeof initialState

const closeIt = handleAction(closeAreaSelectAction, (state, action) => {
  return {
    ...state,
    areaSelect: false,
  };
}, initialState);

const openIt = handleAction(openAreaSelectAction, (state, action) => {
  return {
    ...state,
    areaSelect: true,
  };
}, initialState);

function reducer(
  state = initialState,
  action: Action<any>
): State {
  if(action.type === closeAreaSelectAction().type){
    return closeIt(state, action)
  }
  if(action.type === openAreaSelectAction().type){

    return openIt(state, action)
  }

  return state
}

export default reducer;
