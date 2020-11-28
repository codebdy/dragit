import Mock from 'mockjs'
//import createId from 'mock/utils/createId'
//import {getModuleIndexPage} from './modules'
import getQueryVariable from 'mock/utils/getQueryVariable'
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

window.listModels = {
  '/Model/Role':[
    {
      id:'1',
      name:'超级管理员',
      isSuper:true,
    },
    {
      id:'2',
      name:'管理员',
      auth:[

      ],
    },
    {
      id:'3',
      name:'经理',
      auth:[

      ],
    },
    {
      id:'4',
      name:'业务员',
      auth:[

      ],
    }



  ]
}

export default function mockModel(){
  Mock.mock(RegExp('/api/data/query-operate-models?.*'),'post', (request)=>{
    let modelName = getQueryVariable('modelName',request.url)
    modelName = modelName?.replaceAll('%2F', '/');
    return JSON.parse(JSON.stringify(window.modelsList[modelName]));
  })

  Mock.mock(RegExp('/api/data/list_model?.*'),'get', (request)=>{
    let modelName = getQueryVariable('modelName',request.url)
    modelName = modelName?.replaceAll('%2F', '/');
    return JSON.parse(JSON.stringify(window.listModels[modelName]));
  })

}
