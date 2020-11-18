import { Action } from 'redux-actions';
import {setElevationStrengthAction, setThemeModeAction} from "./actions";

const initialState = {
  themeMode: 'semi-dark',
  elevationStrength: 4,
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
  return state
}

export default reducer;
