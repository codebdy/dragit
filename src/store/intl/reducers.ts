import { handleAction } from 'redux-actions';
import { receivedAction } from "./actions";
import intl from "react-intl-universal"


const initialState = {
  loaded:false,
};

const lang = handleAction(receivedAction, (state, action) => {
  let currentLocale = action.payload.currentLocale;
  intl.init({
    currentLocale,
    locales: {
      [currentLocale]: action.payload.locals
    }
  })
  return {
    ...state,
    loaded:true,
  };
}, initialState);

export default lang;