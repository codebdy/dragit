import { handleAction } from 'redux-actions';
import { getSidebarItems } from '../actions';

const initialState = {
  items: [],
};

const sidebar = handleAction(getSidebarItems, (state, action) => {
  return {
    ...state,
    sidebar: {
      test:'first action test',
    },
  };
}, initialState);

export default sidebar;