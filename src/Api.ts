
const API_GET_DRAWER = {
  url:'/api/drawer',
  method:'get',
}

const API_MEDIAS = {
  method: "get",
  url: '/api/medias/medias',
}

const API_MEDIAS_ADD_FOLDER = {
  method: "post",
  url: '/api/medias/add-folder',
}

const API_MEDIAS_CHANGE_MEDIA_NAME = {
  url:'/api/medias/change-media-name',
  method:'post',
}

const API_MEDIAS_REMOVE_MEDIA = {
  url:'/api/medias/remove-media',
  method:'post',
}
const API_MEDIAS_CHANGE_FOLDER_NAME = {
  method: "post",
  url: '/api/medias/change-folder',
}
const API_MEDIAS_REMOVE_FOLDER = {
  url:'/api/medias/remove-folder',
  method:'post',
}

const API_MEDIAS_MOVE_FOLDER_TO = {
  url:'/api/medias/move-to-folder',
  method:'post',
}

const API_MEDIAS_MOVE_MEDIA_TO = {
  url:'/api/medias/move-media-to',
  method:'post',
}

const API_MEDIAS_REMOVE_MEDIAS = {
  url:'/api/medias/remove-medias',
  method:'post',
}

export {
  API_GET_DRAWER,
  API_MEDIAS,
  API_MEDIAS_ADD_FOLDER,
  API_MEDIAS_CHANGE_MEDIA_NAME,
  API_MEDIAS_REMOVE_MEDIA,
  API_MEDIAS_REMOVE_MEDIAS,
  API_MEDIAS_MOVE_MEDIA_TO,
  API_MEDIAS_CHANGE_FOLDER_NAME,
  API_MEDIAS_REMOVE_FOLDER,
  API_MEDIAS_MOVE_FOLDER_TO
}