import Mock from 'mockjs'
import drawer from './drawer'
import dashboard from './views/dashboard'
import articles from './views/articles'
import formData from './data/formData'
import listData from './data/listData'
import article from './views/article'
import test from './views/test'
import mediaFolders from './medias/mediaFolders'
import medias from './medias/medias'
import modules, {getModuleIndexPage, getModulePage} from './views/modules'

window.idSeed = 100;

function createId(){
    window.idSeed = window.idSeed + 1;
    return window.idSeed;
}

window.drawerData = drawer;

function getQueryVariable(name, oldUrl) {
  const url = decodeURI(oldUrl); // 获取url中"?"符后的字串(包括问号)
  //let query = {};
  if (url.indexOf("?") !== -1) {
      const str = url.substr(url.indexOf("?") + 1);
      const pairs = str.split("&");
      for(let i = 0; i < pairs.length; i ++) {
        const pair = pairs[i].split("=");
        if(pair[0] === name) return  pair[1]; // 返回 参数值
      }
  }
 return(false);
}


Mock.mock('/api/drawer', 'get', window.drawerData)

Mock.mock('/api/save-drawer','post', (request)=>{
  window.drawerData = request.body; 
  return true;
})



Mock.mock(RegExp('/api/get-module-index-page?.*'),'get', (request)=>{
  let id = parseInt(getQueryVariable('moduleId', request.url));
  return getModuleIndexPage(id);
})

Mock.mock(RegExp('api/get-page/?.*'),'get', (request)=>{
  let id = parseInt(getQueryVariable('pageId', request.url));
  return getModulePage(id);
})

Mock.mock('/api/page/dashboard', 'get', dashboard)
Mock.mock(RegExp('/api/data/model?.*'), 'get', formData)
Mock.mock('/api/page/articles', 'get', articles)
Mock.mock('/api/page/article', 'get', article)
Mock.mock('/api/page/test', 'get', test)
Mock.mock('/api/moudle-index/articles', 'get', 'articles')
Mock.mock(RegExp('/api/data/list?.*'), 'get', listData)
Mock.mock('/api/medias/folders', mediaFolders)
Mock.mock(RegExp('/api/medias/medias?.*'),'get', medias)
Mock.mock('/api/medias/add-folder','post', {id:()=>createId(), name:"new folder"})
Mock.mock('/api/medias/change-folder','post')
Mock.mock(RegExp('/api/medias/remove-folder?.*'),'post')
Mock.mock(RegExp('/api/medias/move-to-folder?.*'),'post')
Mock.mock(RegExp('/api/medias/change-media-name?.*'),'post')
Mock.mock(RegExp('/api/medias/remove-media?.*'),'post')
Mock.mock(RegExp('/api/medias/remove-medias?.*'),'post')
Mock.mock(RegExp('/api/medias/move-media-to?.*'),'post')

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

Mock.mock('/api/modules','get', modules)
Mock.mock(RegExp('/api/change-module?.*'),'post', (request)=>{
  let id = getQueryVariable('id', request.url);
  let title = getQueryVariable('title', request.url);
  modules.forEach(module=>{
    if(module.id === id){
      module.title = title;
    }

  })

  return [...modules]
})

Mock.mock(RegExp('/api/remove-module?.*'),'post', (request)=>{
  let index = -1;
  let id = getQueryVariable('id', request.url);
  modules.forEach((module, i)=>{
    if(module.id === parseInt(id)){
      index = i
    }

  })

  if(index > -1){
    modules.splice(index, 1);
  }

  return [...modules]
})

Mock.mock(RegExp('/api/add-module?.*'),'post', (request)=>{
  modules.push({id:createId(), title:'New Module'})
  return [...modules]
})

Mock.mock(RegExp('/api/get-module-by-id?.*'),'get', (request)=>{
  let id = parseInt(getQueryVariable('id', request.url));
  for(var i = 0; i < modules.length; i++){
    if(modules[i].id === id){
      return modules[i];
    }
  }
})

function getModuleById(id){
  for(var i = 0; i < modules.length; i++){
    let module = modules[i];
    if(module.id === parseInt(id)){
      return module;
    }  
  }  
}

Mock.mock(RegExp('/api/update-module-page?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let module =getModuleById(id);
  let page = JSON.parse(request.body).page;
  //console.log(request.body, request.body.page)
  for(var i = 0; i < module.pages.length; i ++){
    if(module.pages[i].id === page.id){
      module.pages[i] = page;
    }
  }
  return JSON.parse(JSON.stringify(module));;
})

Mock.mock(RegExp('/api/remove-page-of-module?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let pageId = parseInt(getQueryVariable('pageId', request.url));
  let module =getModuleById(id);
  module.pages = module.pages.filter(page=>{
    return page.id !== pageId
  })
  return JSON.parse(JSON.stringify(module));
})

Mock.mock(RegExp('/api/add-page-of-module?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let title = getQueryVariable('title', request.url);
  let module =getModuleById(id);
  module.pages = [...module.pages, {id:createId(), title:title}]
  return JSON.parse(JSON.stringify(module));
})

Mock.mock(RegExp('/api/update-index-page-of-module?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let indexPageId = getQueryVariable('indexPageId', request.url);
  let module =getModuleById(id);
  module.indexPageId = parseInt(indexPageId);
  return JSON.parse(JSON.stringify(module));
})

Mock.mock(RegExp('/api/add-auth-of-module?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let name = getQueryVariable('name', request.url);
  let slug = getQueryVariable('slug', request.url);
  let module =getModuleById(id);
  module.auths = [...module.auths, {id:createId(), name:name, slug:slug}]
  return JSON.parse(JSON.stringify(module));
})

Mock.mock(RegExp('/api/remove-auth-of-module?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let authId = parseInt(getQueryVariable('authId', request.url));
  let module =getModuleById(id);
  module.auths = module.pages.filter(auth=>{
    return auth.id !== authId
  })
  return JSON.parse(JSON.stringify(module));
})

Mock.mock(RegExp('/api/update-module-auth?.*'),'post', (request)=>{
  let id = getQueryVariable('moduleId', request.url);
  let module =getModuleById(id);
  let auth = JSON.parse(request.body).auth;
  //console.log(request.body, request.body.page)
  for(var i = 0; i < module.auths.length; i ++){
    if(module.auths[i].id === auth.id){
      module.auths[i] = auth;
    }
  }
  return JSON.parse(JSON.stringify(module));;
})


Mock.setup({
    timeout: 500
})