import meidaPage from "mock/views/meidaPage";
import notificationPage from "mock/views/notificationPage";
import notificationViewPage from "mock/views/notificationViewPage";

export default[
  {
    id:21,
    slug:'dashboard',
    name:'仪表盘'
  },
  {
    id:15,
    name:'媒体管理',
    slug:'medias',
    indexPageId:151,
    pages:[
      {
        id:151,
        name:'媒体库',
        slug:'medias',
        jsonSchema: meidaPage,
      },
    ],
    auths:[
     
    ]
  },

  {
    id:9,
    slug:'notification',
    name:'通知',
    indexPageId:91,
    pages:[
      {
        id:91,
        name:'通知列表',
        slug:'notification-list',
        jsonSchema: notificationPage,
      },
      {
        id:92,
        name:'查看通知',
        slug:'view-notification',
        jsonSchema: notificationViewPage,
      },
    ],
  },

]