import { handleAction, Action } from 'redux-actions';
import { receivedAction, loadingAction } from "./actions";
import intl from "react-intl-universal"


const initialState = {
  loading:true,
};
type State = typeof initialState

const received = handleAction(receivedAction, (state, action) => {
  let currentLocale = action.payload.currentLocale;
  intl.init({
    currentLocale,
    locales: {
      [currentLocale]: action.payload.locals
    }
  })
  return {
    ...state,
    loading:false,
  };
}, initialState);

const loading = handleAction(loadingAction, (state, action) => {
  return {
    ...state,
    loading:true,
  };
}, initialState);


function intlReducer(
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

export default intlReducer;