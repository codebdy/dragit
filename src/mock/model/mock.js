import Mock from 'mockjs'
//import createId from 'mock/utils/createId'
//import {getModuleIndexPage} from './modules'
import getQueryVariable from 'mock/utils/getQueryVariable'
import articles from 'mock/data/articles';
import notifications from 'mock/data/notifications'
import users from './users';
import roles from './roles';
import { getModelName } from '../utils/getModelName';

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
  },

  '/Model/Role':{
    total:12,
    perPage:10,
    currentPage:0,
    data:roles,
  },

  '/Model/Notification':{
    total:12,
    perPage:10,
    currentPage:0,
    data:notifications,
  }

}

window.listModels = {
  '/Model/Role':roles,
  '/Model/User':users,
  '/Model/Article':articles,
  '/Model/Notification':notifications,
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
    return JSON.parse(request.body);
  })

  Mock.mock(RegExp('/api/data/model?.*'), 'get', (request)=>{
    let modelName = getModelName(request.url);
    let id = getId(request.url);
    let models = window.listModels[modelName];
    for(var i = 0; i < models.length; i++){
      if(models[i].id === id){
        return JSON.parse(JSON.stringify({...models[i], forbid:false}));
      }
    }
    console.log('model/mock:no data')
  })
}

