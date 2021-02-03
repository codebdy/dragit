import roleEdit from "./roles/roleEdit";
import roleList from "./roles/roleList";
import userEdit from "./users/userEdit";
import userList from "./users/userList";

var userPages = [
  {
    id:'guid-p-u-1',
    name:'用户列表',
    schema:userList,
  },
  {
    id:'guid-p-u-2',
    name:'用户编辑',
    max_width:'sm',
    query:'rxUser',
    schema:userEdit,
  },
  {
    id:'guid-p-u-3',
    name:'角色列表',
    schema:roleList,
  },
  {
    id:'guid-p-u-4',
    name:'角色编辑',
    max_width:'sm',
    schema:roleEdit,
  },
  {
    id:'guid-p-u-5',
    name:'系统权限列表',
    //schema:jumpEdit,
  },
  {
    id:'guid-p-u-6',
    name:'权限编辑',
    //schema:popList,
  },

]

export default userPages;