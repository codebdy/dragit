import { handleAction, Action } from 'redux-actions';
import {receivedAction, loadingAction} from "./actions";

const initialState = {
  menuItems: [],
  loading: true,
};

type State = typeof initialState

const received = handleAction(receivedAction, (state, action) => {
  return {
    ...state,
    menuItems: action.payload,
    loading: false,
  };
}, initialState);

const loading = handleAction(loadingAction, (state, action) => {
  return {
    ...state,
    loading:true,
  };
}, initialState);

function reducer(
  state = initialState,
  action: Action<any>
): State {
  
  if(action.type === receivedAction().type){
    return received(state, action)
  }
  if(action.type === loadingAction().type){
    return loading(state, action)
  }

  return state
}

export default reducer;
