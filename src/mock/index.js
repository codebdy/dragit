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
import {API_CHANGE_MODULE, API_REMOVE_MODULE} from 'APIs/modules'

window.mediaFolderId = 100;

function createFolderId(){
    window.mediaFolderId = window.mediaFolderId + 1;
    return window.mediaFolderId;
}

var modules = [
  {
    id:1,
    title:'新闻'
  },
  {
    id:2,
    title:'产品'
  },
  {
    id:3,
    title:'用户'
  },
]

Mock.mock('/api/drawer', 'get', drawer)
Mock.mock('/api/page/dashboard', 'get', dashboard)
Mock.mock('/api/data/article', 'get', formData)
Mock.mock('/api/page/articles', 'get', articles)
Mock.mock('/api/page/article', 'get', article)
Mock.mock('/api/page/test', 'get', test)
Mock.mock('/api/moudle-index/articles', 'get', 'articles')
Mock.mock(RegExp('/api/data/list?.*'), 'get', listData)
Mock.mock('/api/medias/folders', mediaFolders)
Mock.mock(RegExp('/api/medias/medias?.*'),'get', medias)
Mock.mock('/api/medias/add-folder','post', {id:()=>createFolderId(), name:"new folder"})
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
Mock.mock(RegExp(API_CHANGE_MODULE + '*'),'post', (request)=>{
  console.log(request)
  modules.forEach(module=>{
    //if(module.id === request.params.id){
    //  module.title = request.params.title;
    //}

  })

  return [...modules]
})

Mock.mock(RegExp(API_REMOVE_MODULE + '*'),'post', (request)=>{
  let index = -1;
  console.log('API_REMOVE_MODULE', request, API_REMOVE_MODULE)
  modules.forEach((module, i)=>{
    //if(module.id === request.params.id){
    //  index = i
    //}

  })

  if(index > -1){
    modules.splice(index, 1);
  }

  return [...modules]
})

Mock.setup({
    timeout: 500
})