import Mock from 'mockjs'
//import createId from 'mock/utils/createId'
//import {getModuleIndexPage} from './modules'
//import getQueryVariable from 'mock/utils/getQueryVariable'
import articles from 'mock/data/listData';
import users from './users';

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

export default function mockModel(){
  Mock.mock(RegExp('/api/data/query-operate-models?.*'),'post', (request)=>{
    let formData = JSON.parse(request.body);
    return JSON.parse(JSON.stringify(window.modelsList[formData.modelName]));
  })
}

