import { handleAction } from 'redux-actions';
import {receivedAction} from "./actions";

const initialState = {
  menuItems: [],
  loaded: false,
};

const menuItems = handleAction(receivedAction, (state, action) => {
  return {
    ...state,
    menuItems: action.payload,
    loaded: true,
  };
}, initialState);

export default menuItems;