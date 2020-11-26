import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'
import articles from './views/articles'
import formData from './data/formData'
import listData from './data/listData'
import article from './views/article'
import test from './views/test'
import auths from './data/auths'
import appInfo from './data/appInfo'
import notifications from './data/notifications'
import mockMedias from './medias/mock'
import modules from './modules/modules'
import mockModules from './modules/mock'
import mockModel from './modules/mock'

window.drawerData = drawer;
window.modules = modules;


Mock.mock('/api/drawer', 'get', window.drawerData)

Mock.mock('/api/save-drawer','post', (request)=>{
  window.drawerData = request.body; 
  return true;
})

Mock.mock('/api/page/dashboard', 'get', dashboard)
Mock.mock(RegExp('/api/data/model?.*'), 'get', formData)
Mock.mock('/api/page/articles', 'get', articles)
Mock.mock('/api/page/article', 'get', article)
Mock.mock('/api/page/test', 'get', test)
Mock.mock('/api/moudle-index/articles', 'get', 'articles')
Mock.mock(RegExp('/api/data/list?.*'), 'get', listData)

mockMedias();
mockModules();
mockModel();

Mock.mock('/api/base/items','get', [
    {
        id:'base1',
        name:'条目1',
      },
      {
        id:'base2',
        name:'条目2',
      },
      {
        id:'base3',
        name:'条目3',
      },
])


Mock.mock('/api/get-auths','get', auths)

Mock.mock('/api/login', 'post',  (request)=>{
  let data = JSON.parse(request.body)
  if(data.account === 'demo' && data.password === 'demo'){
    return{
      success:true,
      appInfo:appInfo,
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