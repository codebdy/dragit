import {articlesData} from 'mock/data/articlesData';
import notifications from 'mock/data/notifications'
import users from '../data/users';
import roles from '../data/roles';
import tags from 'mock/data/tags';
import articleAttributes from 'mock/data/articleAttributes';
import products from 'mock/data/products';
import productAttributes from 'mock/data/productAttributes'
import ordersData from 'mock/data/ordersData';
import customerData from 'mock/data/customerData';
import suppliersData from 'mock/data/suppliersData';
import enqueries from 'mock/data/enqueries';

export var modelsList = {
  '/Model/Article':{
    total:123,
    perPage:10,
    currentPage:0,
    data:articlesData,
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

export var models = {
  '/Model/Role':roles,
  '/Model/User':users,
  '/Model/Article':articlesData,
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