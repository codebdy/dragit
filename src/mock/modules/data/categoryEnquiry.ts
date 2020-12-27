import enqueriesPage from "mock/views/enqueriesPage";
import enqueryViewPage from "mock/views/enqueryViewPage";

export default[
  {
    id:14,
    name:'询盘管理',
    slug:'enquery',
    entry_page_id:141,
    pages:[
      {
        id:141,
        name:'询盘列表',
        slug:'enqueries',
        schema: enqueriesPage,
      },
      {
        id:142,
        name:'询盘查看',
        slug:'enquery-view',
        schema: enqueryViewPage,
      },
    ],
    auths:[
     
    ]
  },
]