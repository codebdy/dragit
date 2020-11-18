import { Action } from 'redux-actions';
import {setThemeModeAction} from "./actions";

const initialState = {
  themeMode: 'semi-dark',
};

type State = typeof initialState


function reducer(
  state = initialState,
  action: Action<any>
): State {
  if(action.type === setThemeModeAction().type){
    return {
      ...state,
      themeMode: action.payload,
    };
  }
  return state
}

export default reducer;
