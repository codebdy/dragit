import { handleAction } from 'redux-actions';
import {getMenuItemsRequestAction} from "./actions";

const initialState = {
  items: [],
};

const sidebar = handleAction(getMenuItemsRequestAction, (state, action) => {
  return {
    ...state,
    menuItems: [
      {
        id:"1",
        name:"vular-menu-item",
        prependIcon:'mdi-speedometer',
        title:'测试菜单',
        active:true,
        to:{name:'dashboard'},
      },
    ],
  };
}, initialState);

export default sidebar;