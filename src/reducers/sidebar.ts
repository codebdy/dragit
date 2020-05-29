import { handleAction } from 'redux-actions';
import { getSidebarItems } from '../actions';

const initialState = {
  items: [],
};

const sidebar = handleAction(getSidebarItems, (state, action) => {
  return {
    ...state,
    sidebar: [
      {
        id:"1",
        name:"vular-menu-item",
        prependIcon:'mdi-speedometer',
        title:'仪表盘',
        active:true,
        to:{name:'dashboard'},
      },
    ],
  };
}, initialState);

export default sidebar;