var modules = [
  {
    id:1,
    title:'新闻',
    indexPageId:1,
    pages:[
      {
        id:1,
        title:'新闻列表',
        API:'/api/data/list',
        isFormPage:false,
      },
      {
        id:2,
        title:'新闻编辑',
        API:'/api/data/article',
        isFormPage:true,
      },
    ]
  },
  {
    id:2,
    title:'产品'
  },
  {
    id:3,
    title:'用户'
  },

  {
    id:21,
    title:'仪表盘'
  },

]

export default modules;