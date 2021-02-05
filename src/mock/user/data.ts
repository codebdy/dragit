var usersData = [
  {
    id:1,
    login_name:'admin',
    password:'admin',
    name:'超级管理员',
    email:'super@drag.fit',
    is_supper:true,
    roles:[],
    //forbid:'<span style="background:#eee; border-radius:12px; padding:6px;">正常</span>',
    created_at:'2019-02-22 10:52:44',
  },
  {
    id:2,
    login_name:'demo',
    password:'demo',
    name:'演示账号',
    email:'demo@drag.fit',
    roles:[
      {
        id:2,
        name:'经理',
        status:'normal',
        description:'大经理，超级牛',
      },
      {
        id:3,
        name:'测试',
        description:'只是个测试，哪来地位？',
        status:'forbid',
      }
    ],
    is_demo:true,
    avatar:{
      id:'8',
      thumbnail: '/static/images/grid-list/plant.jpg',
      title: 'Water plant',
      author: 'BkrmadtyaKarki',
    },
    status:'NORMAL',
    //forbid:'<span style="background:#eee; border-radius:12px; padding:6px;">正常</span>',
    created_at:'2019-02-22 13:30:49',
  },
  {
    id:3,
    login_name:'test',
    password:'test',
    name:'测试',
    email:'test@drag.fit',
    roleNames:'测试员',
    status:'FORBID',
    created_at:'2019-02-22 13:31:23',
  }
]

export default usersData;