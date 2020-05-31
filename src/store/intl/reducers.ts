import { handleAction } from 'redux-actions';
import { receivedAction } from "./actions";
import intl from "react-intl-universal"


const initialState = {
  initDone:false,
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
    initDone:true,
  };
}, initialState);

export default lang;