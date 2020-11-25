import { Action } from 'redux-actions';
import { setAppInfoAction } from './actions';

const initialState = {
  info: undefined,
};

type State = typeof initialState

function reducer(
  state = initialState,
  action: Action<any>
): State {
  if(action.type === setAppInfoAction().type){
    return {
      ...state,
      info: action.payload,
    };
  }
  return state
}

export default reducer;
