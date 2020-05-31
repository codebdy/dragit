import { handleAction } from 'redux-actions';
import { receivedAction } from "./actions";
import intl from "react-intl-universal"

const initialState = {
  lang: null,
};

const lang = handleAction(receivedAction, (state, action) => {
  let currentLocale = action.payload.currentLocale;
  return {
    ...state,
    intl: intl.init({
      currentLocale,
      locales: {
        [currentLocale]: action.payload.locals
      }
    })
  };
}, initialState);

export default lang;