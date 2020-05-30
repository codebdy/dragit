export default [
  {
    id:"h1",
    //type:subheader, item, group
    type:'subheader',
    title:'应用',
  },
  {
    id:"1",
    type:'item',
    title:'仪表盘',
    to:{name:'dashboard'},
    icon:'mdi mdi-speedometer',
  },
  {
    id:"2",
    title:'文章管理',
    type:'group',
    icon:'mdi mdi-text-box-outline',
    children:[
        {
          id:"h2-1",
          //type:subheader, item, group
          type:'subheader',
          title:'二级应用',
        },
        {
        id:"2-1",
        title:'添加文章',
        type:'item',
        to:{name:'dashboard'},
        icon:'mdi mdi-circle-small',
      },
      {
        id:"2-2",
        title:'文章列表',
        type:'item',
        to:{name:'dashboard'},
        icon:'mdi mdi-circle-small',
      },
    
    ],
  },
  {
    id:"3",
    title:'多级嵌套',
    type:'group',
    icon:'mdi mdi-plus-circle',
    children:[
      {
        id:"3-1",
        title:'层级2',
        type:'group',
        to:{name:'dashboard'},
        icon:'mdi mdi-plus-circle',
        children:[
          {
            id:"3-2-1",
            title:'层级3',
            type:'item',
            to:{name:'dashboard'},
            icon:'mdi mdi-plus-circle',
          },
    
        ]
      },
      {
        id:"3-2",
        title:'文章列表',
        type:'item',
        to:{name:'dashboard'},
        icon:'mdi mdi-plus-circle',
      },
    
    ],
  },
  {
    id:"4",
    title:'询盘',
    type:'item',
    to:{name:'dashboard'},
    icon:'mdi mdi-plus-circle',
  },
]