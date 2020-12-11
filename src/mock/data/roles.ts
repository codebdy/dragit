import { AUTH_DASHBOARD, AUTH_MEDIAS } from "APIs/authSlugs";

var roles = [
  {
    id:1,
    name:'管理员',
    forbid:'<span style="background:#eee; border-radius:12px; padding:6px;">正常</span>',
    description:'只是个小小管理员',
    auths:[

    ],
  },
  {
    id:2,
    name:'经理',
    forbid:false,
    description:'大经理，超级牛',
    auths:[
      AUTH_DASHBOARD
    ],
  },
  {
    id:3,
    name:'测试',
    description:'只是个测试，哪来地位？',
    forbid:'<span style="background:red; border-radius:12px; padding:6px;color:#FFF;">禁用</span>',
    auths:[
      AUTH_DASHBOARD,
      AUTH_MEDIAS
    ],
  }
]

export default roles;