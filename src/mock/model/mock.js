import Mock from 'mockjs'
//import createId from 'mock/utils/createId'
//import {getModuleIndexPage} from './modules'
import getQueryVariable from 'mock/utils/getQueryVariable'
import articles from 'mock/data/listData';
import users from './users';
import roles from './roles';

window.modelsList = {
  '/Model/Article':{
    total:123,
    perPage:10,
    currentPage:0,
    data:articles,
  },

  '/Model/User':{
    total:12,
    perPage:10,
    currentPage:0,
    data:users,
  }
}

window.listModels = {
  '/Model/Role':roles,
  '/Model/User':users,
}

function getModelName(url){
  let modelName = getQueryVariable('modelName',url)
  modelName = modelName?.replaceAll('%2F', '/');
  return modelName;
}

function getId(url){
  return parseInt(getQueryVariable('id', url))
}

export default function mockModel(){
  Mock.mock(RegExp('/api/data/query-operate-models?.*'),'post', (request)=>{
    let modelName = getModelName(request.url);
    return JSON.parse(JSON.stringify(window.modelsList[modelName]));
  })

  Mock.mock(RegExp('/api/data/list_model?.*'),'get', (request)=>{
    let modelName = getModelName(request.url);
    return JSON.parse(JSON.stringify(window.listModels[modelName]));
  })

  Mock.mock('/api/submit-model','post', (request)=>{
    console.log('serve received data:', JSON.parse(request.body));
    return JSON.parse(JSON.stringify(request.body));
  })

  Mock.mock(RegExp('/api/data/model?.*'), 'get', (request)=>{
    let modelName = getModelName(request.url);
    let id = getId(request.url);
    let models = window.listModels[modelName];
    for(var i = 0; i < models.length; i++){
      if(models[i].id === id){
        return JSON.parse(JSON.stringify(models[i]));
      }
    }
    console.log('model/mock:no data')
  })
}

