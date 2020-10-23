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

window.mediaFolderId = 100;

function createFolderId(){
    window.mediaFolderId = window.mediaFolderId + 1;
    return window.mediaFolderId;
}

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

Mock.setup({
    timeout: 500
})