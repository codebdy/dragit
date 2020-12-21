import rolePage from "mock/views/rolePage";
import rolesPage from "mock/views/rolesPage";
import user from "mock/views/user";
import users from "mock/views/users";

export default[
  {
    id:7,
    slug:'user',
    name:'管理员',
    indexPageId:71,
    pages:[
      {
        id:71,
        name:'管理员列表',
        slug:'urser-list',
        schema: users,
      },
      {
        id:72,
        name:'管理员编辑',
        slug:'edit-user',
        schema: user,
      },
    ],
  },
  {
    id:8,
    slug:'role',
    name:'角色',
    indexPageId:81,
    pages:[
      {
        id:81,
        name:'角色列表',
        slug:'role-list',
        schema: rolesPage,
      },
      {
        id:82,
        name:'角色编辑',
        slug:'edit-role',
        schema: rolePage,
      },
    ],
  },

]