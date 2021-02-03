import { AUTH_CREATE_APP, AUTH_DEBUG, AUTH_EDIT_APP, AUTH_REMOVE_APP } from "Base/authSlugs";
import { IRxAuth } from "Base/Model/IRxAuth";

var authsData :Array<IRxAuth>= [
  {
    id:'system-1',
    rx_slug:AUTH_DEBUG,
    name:'调试',
    predefined:true,
    group_name:'系统'
  },
  {
    id:'system-2',
    rx_slug:AUTH_CREATE_APP,
    name:'创建应用',
    predefined:true,
    group_name:'系统'
  },
  {
    id:'system-3',
    rx_slug:AUTH_EDIT_APP,
    name:'编辑应用',
    predefined:true,
    group_name:'系统'
  },
  {
    id:'system-4',
    rx_slug:AUTH_REMOVE_APP,
    name:'删除应用',
    predefined:true,
    group_name:'系统'
  },

]

export default authsData;