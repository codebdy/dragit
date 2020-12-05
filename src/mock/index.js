import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'
import articles from './views/articles'
import article from './views/article'
import auths from './data/auths'
import appInfo from './data/appInfo'
import notifications from './data/notifications'
import mockMedias from './medias/mock'
import mockModules from './modules/mock'
import mockModel from './model/mock'
import mockTrees from './tree/mock'

window.drawerData = drawer;


Mock.mock('/api/drawer', 'get', window.drawerData)

Mock.mock('/api/save-drawer','post', (request)=>{
  window.drawerData = request.body; 
  return true;
})

Mock.mock('/api/page/dashboard', 'get', dashboard)
Mock.mock('/api/page/articles', 'get', articles)
Mock.mock('/api/page/article', 'get', article)
//Mock.mock('/api/moudle-index/articles', 'get', 'articles')
//Mock.mock(RegExp('/api/data/list?.*'), 'get', listData)

mockMedias();
mockModules();
mockModel();
mockTrees();

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