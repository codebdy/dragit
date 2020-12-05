import enqueriesPage from "mock/views/enqueriesPage";
import enqueryViewPage from "mock/views/enqueryViewPage";

export default[
  {
    id:14,
    name:'询盘管理',
    slug:'enquery',
    indexPageId:141,
    pages:[
      {
        id:141,
        name:'询盘列表',
        slug:'enqueries',
        jsonSchema: enqueriesPage,
      },
      {
        id:142,
        name:'询盘查看',
        slug:'enquery-view',
        jsonSchema: enqueryViewPage,
      },
    ],
    auths:[
     
    ]
  },
]