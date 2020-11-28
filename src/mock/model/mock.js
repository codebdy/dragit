import Mock from 'mockjs'
//import createId from 'mock/utils/createId'
//import {getModuleIndexPage} from './modules'
import getQueryVariable from 'mock/utils/getQueryVariable'
import articles from 'mock/data/listData';
import users from './users';
import formData from 'mock/data/formData'

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

window.models = {
  '/Model/User' : {
    id:7,
    login_name:'demo',
    name:'演示账号',
    roles:[1,2],
    avatar:{
      id:'8',
      thumbnail: '/static/images/grid-list/plant.jpg',
      title: 'Water plant',
      author: 'BkrmadtyaKarki',
    },
  },
  '/Model/Article': formData,
}

function getModelName(url){
  let modelName = getQueryVariable('modelName',url)
  modelName = modelName?.replaceAll('%2F', '/');
  return modelName;
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

  Mock.mock(RegExp('/api/data/model?.*'), 'get', (request)=>{
    let modelName = getModelName(request.url);
    return JSON.parse(JSON.stringify(window.models[modelName]));
  })
}
