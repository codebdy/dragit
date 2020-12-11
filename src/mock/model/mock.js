import Mock from 'mockjs'
//import createId from 'mock/utils/createId'
//import {getModuleIndexPage} from './modules'
import getQueryVariable from 'mock/utils/getQueryVariable'
import articles from 'mock/data/articlesData';
import notifications from 'mock/data/notifications'
import users from '../data/users';
import roles from '../data/roles';
import { getModelName } from '../utils/getModelName';
import tags from 'mock/data/tags';
import articleAttributes from 'mock/data/articleAttributes';
import products from 'mock/data/products';
import productAttributes from 'mock/data/productAttributes'
import ordersData from 'mock/data/ordersData';
import customerData from 'mock/data/customerData';
import suppliersData from 'mock/data/suppliersData';
import enqueries from 'mock/data/enqueries';

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
  },

  '/Model/Tag':{
    total:12,
    perPage:10,
    currentPage:0,
    data:tags,
  },

  '/Model/ArticleAttribute':{
    total:12,
    perPage:10,
    currentPage:0,
    data:articleAttributes,
  },

  '/Model/Product':{
    total:12,
    perPage:10,
    currentPage:0,
    data:products,
  },

  '/Model/ProductAttribute':{
    total:12,
    perPage:10,
    currentPage:0,
    data:productAttributes,
  },

  '/Model/Order':{
    total:12,
    perPage:10,
    currentPage:0,
    data:ordersData,
  },

  '/Model/Customer':{
    total:12,
    perPage:10,
    currentPage:0,
    data:customerData,
  },

  '/Model/Supplier':{
    total:12,
    perPage:10,
    currentPage:0,
    data:suppliersData,
  },

  '/Model/Enquery':{
    total:12,
    perPage:10,
    currentPage:0,
    data:enqueries,
  },

}

window.listModels = {
  '/Model/Role':roles,
  '/Model/User':users,
  '/Model/Article':articles,
  '/Model/Notification':notifications,
  '/Model/Tag':tags,
  '/Model/ArticleAttribute':articleAttributes,
  '/Model/Product':products,
  '/Model/ProductAttribute':productAttributes,
  '/Model/Order': ordersData,
  '/Model/Customer':customerData,
  '/Model/Supplier':suppliersData,
  '/Model/Enquery' :enqueries,
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

  Mock.mock(RegExp('/api/submit-model?.*'),'post', (request)=>{
    let model = JSON.parse(request.body)
    let modelName = getModelName(request.url);
    let models = window.listModels[modelName];
    for(var i = 0; i < models.length; i++){
      if(models[i].id === model.id){
        return models[i] = model;
      }
    }
    return model;
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

