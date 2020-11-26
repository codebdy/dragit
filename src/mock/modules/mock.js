import Mock from 'mockjs'
import createId from 'mock/utils/createId'
import {getModuleIndexPage} from './modules'
import getQueryVariable from 'mock/utils/getQueryVariable'


export function getModulePage(pageSlug){
  let modules = window.modules
  for(var i = 0; i < modules.length; i++){
    let module = modules[i]
    let pages = module.pages
    if(pages){
      for(var j=0; j < pages.length; j++){
        if(pages[j].slug === pageSlug){
          return JSON.parse(JSON.stringify(pages[j]));
        }
      }
    }
  }
}

export default function mockModules(){
  let modules = window.modules;
  Mock.mock('/api/modules','get', modules)
  Mock.mock(RegExp('/api/change-module?.*'),'post', (request)=>{
    let id = getQueryVariable('id', request.url);
    let title = getQueryVariable('title', request.url);
    let slug = getQueryVariable('slug', request.url);
    
    for(var i = 0; i < modules.length; i++){
      let module = modules[i];
      if(module.id.toString() === id){
        module.title = title;
        module.slug = slug;
        return module
      }
    }
  
    //return [...modules]
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
  Mock.mock(RegExp('/api/get-module-index-page?.*'),'get', (request)=>{
    let slug = getQueryVariable('moduleSlug', request.url);
    return getModuleIndexPage(slug);
  })
  
  Mock.mock(RegExp('/api/get-page/?.*'),'get', (request)=>{
    let slug =getQueryVariable('pageSlug', request.url);
    return getModulePage(slug);
  })

  
  Mock.mock(RegExp('/api/get-module-index-page?.*'),'get', (request)=>{
    let slug = getQueryVariable('moduleSlug', request.url);
    return getModuleIndexPage(slug);
  })

  Mock.mock(RegExp('/api/get-page/?.*'),'get', (request)=>{
    let slug =getQueryVariable('pageSlug', request.url);
    return getModulePage(slug);
  })
  
}