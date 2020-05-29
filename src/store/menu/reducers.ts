import { handleAction } from 'redux-actions';
import {receivedAction} from "./actions";

const initialState = {
  items: [],
};

const sidebar = handleAction(receivedAction, (state, action) => {
  console.log('receivedAction', action)
  return {
    ...state,
    menuItems: action.payload
  };
}, initialState);

export default sidebar;