import { handleAction } from 'redux-actions';
import {receivedAction} from "./actions";

const initialState = {
  menuItems: [],
  loading: true,
};

const menuItems = handleAction(receivedAction, (state, action) => {
  return {
    ...state,
    menuItems: action.payload,
    loading: false,
  };
}, initialState);

export default menuItems;