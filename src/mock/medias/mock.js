import Mock from 'mockjs'
import mediaFolders from './mediaFolders'
import medias from './medias'
import createId from 'mock/utils/createId'

export default function mockMedias(){
  Mock.mock('/api/medias/folders', mediaFolders)
  Mock.mock(RegExp('/api/medias/medias?.*'),'get', medias)
  Mock.mock('/api/medias/add-folder','post', {id:()=>createId(), name:"new folder"})
  Mock.mock('/api/medias/change-folder','post')
  Mock.mock(RegExp('/api/medias/remove-folder?.*'),'post')
  Mock.mock(RegExp('/api/medias/move-to-folder?.*'),'post')
  Mock.mock(RegExp('/api/medias/change-media-name?.*'),'post')
  Mock.mock(RegExp('/api/medias/remove-media?.*'),'post')
  Mock.mock(RegExp('/api/medias/remove-medias?.*'),'post')
  Mock.mock(RegExp('/api/medias/move-media-to?.*'),'post')
  
}