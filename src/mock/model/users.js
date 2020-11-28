export default[
  {
    id:1,
    login_name:'admin',
    name:'超级管理员',
    email:'super@drag.fit',
    isSuper:true,
    //roles:'',
    status:'<span style="background:#eee; border-radius:12px; padding:6px;">正常</span>',
    created_at:'2019-02-22 10:52:44',
  },
  {
    id:2,
    login_name:'demo',
    name:'演示账号',
    email:'demo@drag.fit',
    roles:'编辑, 读者',
    roleIds:[1,2],
    avatar:{
      id:'8',
      thumbnail: '/static/images/grid-list/plant.jpg',
      title: 'Water plant',
      author: 'BkrmadtyaKarki',
    },
    status:'<span style="background:#eee; border-radius:12px; padding:6px;">正常</span>',
    created_at:'2019-02-22 13:30:49',
  },
  {
    id:3,
    login_name:'test',
    name:'测试',
    email:'test@drag.fit',
    roles:['测试员'],
    status:'<span style="background:red; border-radius:12px; padding:6px;color:#FFF;">禁用</span>',
    created_at:'2019-02-22 13:31:23',
  }


]