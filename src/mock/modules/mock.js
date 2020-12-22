import Mock from 'mockjs'
import createId from 'utils/createId'
import getQueryVariable from 'mock/utils/getQueryVariable'
import moduleCategories from './moduleCategories'
import { remove } from 'utils/ArrayHelper';
import { getModuleIndexPage } from './getModuleIndexPage';
import { getPageBySlug } from './getPageBySlug';
import { getModuleById } from './getModuleById';

export function getCagegoryById(id){
  for(var index = 0; index < moduleCategories.length; index++){
    if(moduleCategories[index].id.toString() === id){
      return moduleCategories[index];
    }
  }
}

export function getCategoryOfModule(id){
  for(var index = 0; index < moduleCategories.length; index++){
    let modules = moduleCategories[index].modules;
    for(var i = 0; i < modules.length; i++){
      let module = modules[i]
      if(module.id.toString() === id){
        return  moduleCategories[index];
      }
    }
  }
}

export default function mockModules(){
  Mock.mock('/api/modules','get', (request)=>{
    return JSON.parse(JSON.stringify(moduleCategories));
  } );

  Mock.mock(RegExp('/api/change-cagegory?.*'),'post', (request)=>{
    let id = getQueryVariable('id', request.url);
    let name = getQueryVariable('name', request.url);
    
    let category = getCagegoryById(id);
    if(category){
      category.name = name;
      return category      
    }
  })


  Mock.mock(RegExp('/api/change-module?.*'),'post', (request)=>{
    let id = getQueryVariable('id', request.url);
    let name = getQueryVariable('name', request.url);
    let slug = getQueryVariable('slug', request.url);
    
    let module = getModuleById(id);
    if(module){
      module.title = name;
      module.slug = slug;
      return module      
    }
  })

  
  
  Mock.mock(RegExp('/api/remove-cagegory-module?.*'),'post', (request)=>{
    let id = getQueryVariable('id', request.url);  
    let cagtegory = getCagegoryById(id);  
    remove(cagtegory, moduleCategories);
  })

  Mock.mock(RegExp('/api/remove-module?.*'),'post', (request)=>{
    let id = getQueryVariable('id', request.url);  
    let category = getCategoryOfModule(id);
    let module = getModuleById(id);
    remove(module, category.modules);
  })

    
  Mock.mock(RegExp('/api/add-module-category?.*'),'post', (request)=>{
    let name = getQueryVariable('name', request.url);
    let category = {id:createId(), name:name};
    moduleCategories.push(category);
    return category
  })
  
  
  Mock.mock(RegExp('/api/add-module?.*'),'post', (request)=>{
    let name = getQueryVariable('name', request.url);
    let cagegoryId = getQueryVariable('cagegoryId', request.url);
    let category = getCagegoryById(cagegoryId);
    let module = {id:createId(), name:name, pages:[], auths:[]};
    category.modules = category.modules ? category.modules :[];
    category.modules.push(module);
  })
  
  Mock.mock(RegExp('/api/get-module-by-id?.*'),'get', (request)=>{
    let id = getQueryVariable('id', request.url);
    return getModuleById(id);
  })
  
 
  Mock.mock(RegExp('/api/update-page?.*'),'post', (request)=>{
    let page = JSON.parse(request.body).page;
    console.log('server recieved page update rquest', page);
    for(var index = 0; index < moduleCategories.length; index++){
      let modules = moduleCategories[index].modules;
      for(var i = 0; i < modules.length; i++){
        let module = modules[i];
        for(var pi = 0; pi < module.pages.length; pi ++){
          if(module.pages[pi].id === page.id){
            module.pages[pi] = page;
            console.log('found!', module.pages[pi]);
          }
        }
      }
    }
    return true;//JSON.parse(JSON.stringify(module));;
  })

  //操作成功后返回page所在模块
  Mock.mock(RegExp('/api/update-module-page?.*'),'post', (request)=>{
    let page = JSON.parse(request.body).page;
    for(var index = 0; index < moduleCategories.length; index++){
      let modules = moduleCategories[index].modules;
      for(var i = 0; i < modules.length; i++){
        let module = modules[i];
        for(var pi = 0; pi < module.pages.length; pi ++){
          if(module.pages[pi].id === page.id){
            module.pages[pi] = page;
            return JSON.parse(JSON.stringify(module));
          }
        }
      }
    }
    throw new Error('not found!') ;
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
    let name = getQueryVariable('name', request.url);
    let slug = getQueryVariable('slug', request.url);
    let module =getModuleById(id);
    module.pages = [...module.pages, {id:createId(), name, slug}]
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
    let page = getPageBySlug(slug);
    if(page) {
      return page;
    }
    new Error("404");
  })

  
  Mock.mock(RegExp('/api/get-module-index-page?.*'),'get', (request)=>{
    let slug = getQueryVariable('moduleSlug', request.url);
    let module =  getModuleIndexPage(slug);
    if(module) {
      return module;
    }
    console.log('not found page');
    throw new Error("404");
  })
  
  Mock.mock(RegExp('/api/clone-category?.*'),'post', (request)=>{
    let id =getQueryVariable('id', request.url);
    let category = getCagegoryById(id);
    category = JSON.parse(JSON.stringify(category));
    category.id = createId();
    category.name = category.name + " of copy";
    category.modules && category.modules.forEach((module)=>{
      module.id = createId();
      module.slug = module.slug + '-' + createId();
      module.pages && module.pages.forEach((page)=>{
        page.id = createId();
        page.slug = page.slug + '-' + createId()
      });
      module.auths && module.auths.forEach((auth)=>{
        auth.id = createId();
        auth.slug = auth.slug + '-' + createId()
      });
    });

    moduleCategories.push(category)
  })
  
  Mock.mock(RegExp('/api/clone-module?.*'),'post', (request)=>{
    let id =getQueryVariable('id', request.url);
    let module = getModuleById(id);
    let cagegory = getCategoryOfModule(id);
    module = JSON.parse(JSON.stringify(module));
    module.id = createId();
    module.name = module.name + " of copy";
    module.slug = module.slug + '-' + createId();
    module.pages && module.pages.forEach((page)=>{
      page.id = createId();
      page.slug = page.slug + '-' + createId();
    });
    module.auths && module.auths.forEach((auth)=>{
      auth.id = createId();
      auth.slug = auth.slug + '-' + createId()
    });

    cagegory.modules&&cagegory.modules.push(module);
  })

  Mock.mock(RegExp('/api/move-module-to-category?.*'),'post', (request)=>{
    let moduleId = getQueryVariable('moduleId', request.url);
    let cagegoryId = getQueryVariable('cagegoryId', request.url);
    let module = getModuleById(moduleId);
    let oldCategory = getCategoryOfModule(moduleId);
    let newCagtegory = getCagegoryById(cagegoryId)
    remove(module, oldCategory.modules);
    newCagtegory.modules = newCagtegory.modules ? newCagtegory.modules :[];
    newCagtegory.modules.push(module);
  })
  

}