import { AUTH_DASHBOARD, AUTH_MEDIAS } from "base/authSlugs";

var roles = [
  {
    id:1,
    name:'管理员',
    status:'normal',
    description:'只是个小小管理员',
    auths:[

    ],
  },
  {
    id:2,
    name:'经理',
    status:'normal',
    description:'大经理，超级牛',
    auths:[
      AUTH_DASHBOARD
    ],
  },
  {
    id:3,
    name:'测试',
    description:'只是个测试，哪来地位？',
    status:'forbid',
    auths:[
      AUTH_DASHBOARD,
      AUTH_MEDIAS
    ],
  }
]

export default roles;