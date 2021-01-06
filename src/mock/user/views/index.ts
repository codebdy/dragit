import user from "./user";
import users from "./users";

export var userModuleFragment={
  entry_page_id:'111',
    pages:[
      {
        id:'111',
        name:'管理员列表',
        slug:'urser-list',
        max_width:'lg',
        schema: users,
      },
      {
        id:'112',
        name:'管理员编辑',
        max_width:'md',
        slug:'edit-user',
        schema: user,
      },
    ],
}