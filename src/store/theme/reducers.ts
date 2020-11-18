import { Action } from 'redux-actions';
import {setElevationStrengthAction, setPrimaryColorAction, setThemeModeAction} from "./actions";

const initialState = {
  themeMode: 'light',
  elevationStrength: 4,
  primary:'#5d78ff',
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

  if(action.type === setElevationStrengthAction().type){
    return {
      ...state,
      elevationStrength: action.payload,
    };
  }
  
  if(action.type === setPrimaryColorAction().type){
    return {
      ...state,
      primary: action.payload,
    };
  }
  return state
}

export default reducer;
