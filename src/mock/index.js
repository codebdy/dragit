import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'
import auths from './data/auths'
import appInfo from './data/appInfo'
import notifications from './data/notifications'
import mockMedias from './medias/mock'
import mockModules from './modules/mock'
import mockModel from './model/mock'
import mockTrees from './tree/mock'

window.drawerData = drawer;


function login(account, password){
  let users = window.listModels['/Model/User']
  if(!users){
    return undefined
  }

  for(var i = 0; i < users.length; i++){
    let user = users[i];
    if(user.login_name === account && user.password === password){
      return user;
    }
  }
}

Mock.mock('/api/drawer', 'get', (request)=>{
  return window.drawerData;
})

Mock.mock('/api/save-drawer','post', (request)=>{
  window.drawerData = JSON.parse(request.body); 
  return true;
})

Mock.mock('/api/page/dashboard', 'get', dashboard)

mockMedias();
mockModules();
mockModel();
mockTrees();

Mock.mock('/api/get-auths','get', (request)=>{
  return auths
})

Mock.mock('/api/login', 'post',  (request)=>{
  let data = JSON.parse(request.body)
  let user = login(data.account,  data.password)
  if(user){
    return{
      success:true,
      appInfo:{...appInfo, user:user},
    }   
  }
  else{
    return{
      status:false,
      errorMessage:'用户名或密码错误',
    }
  }
})

Mock.mock('/api/get-app-info','get', (request)=>{
  return appInfo
})

Mock.mock('/api/get-lasted-notifications', notifications);

Mock.setup({
    timeout: 500
})