import { handleAction } from 'redux-actions';
import {receivedAction} from "./actions";

const initialState = {
  menuItems: [],
};

const menuItems = handleAction(receivedAction, (state, action) => {
  return {
    ...state,
    menuItems: action.payload
  };
}, initialState);

export default menuItems;