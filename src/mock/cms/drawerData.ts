export var cmsDrawerData= [
  {
    type: 'item',
    title: '分析看板',
    icon: 'mdi-view-dashboard',
    chip: {
        color: 'primary',
        label: '新',
        size: 'small',
    },
    auths:[],
    pageId:'guid-p-cms-1',
  },
  {
    title: '询盘管理',
    type: 'group',
    icon: 'mdi-email-outline',

    children: [
      {
          title:"询盘",
          type:'item',
          icon: 'mdi-circle-small',
          pageId: 'guid-p-cms-2',
          badge: {
              color: 'secondary',
              field: 'inquiries',
              size: 'small',
          }               
      },
      {
          title:"垃圾箱",
          type:'item',
          icon: 'mdi-circle-small',
      },
      {
          title:"拦截设置",
          type:'item',
          icon: 'mdi-circle-small',
      }
    ]
  },
  {
    type: 'item',
    title: '媒体库',
    icon: 'mdi-image-auto-adjust',
    pageId: 'guid-p-cms-4',
    auths:[]
  },  
  {
    title: '文章管理',
    type: 'group',
    icon: 'mdi-text-box-outline',
    children: [
      {
          title: '文章',
          type: 'item',
          icon: 'mdi-circle-small',
          pageId: 'guid-p-cms-5',
      },
      {
          title: '频道',
          type: 'item',
          icon: 'mdi-circle-small',
          pageId: 'guid-p-cms-7',
      },
      {
          title: '标签',
          type: 'item',
          icon: 'mdi-circle-small',
          to: '/admin/module/article-tag',
      },
      {
          title: '属性',
          type: 'item',
          icon: 'mdi-circle-small',
          to: '/admin/module/article-attribute',
      },
    ],
  },
  {
    title: '产品管理',
    type: 'group',
    icon: 'mdi-basket-outline',
    children:[
      {
          title: '产品',
          type: 'item',
          icon: 'mdi-circle-small',
          to: '/admin/module/product',
      },
      {
          title: '分类',
          type: 'item',
          icon: 'mdi-circle-small',
          to: '/admin/module/product-category',
      },
      {
          title: '属性',
          type: 'item',
          icon: 'mdi-circle-small',
          to: '/admin/module/product-attribute',
      },
    ]

  },

  {
    type: 'item',
    title: '页面管理',
    icon: 'mdi-file-outline',
    auths:[]
  },

  {
    type: 'item',
    title: '网站导航',
    icon: 'mdi-sitemap',
    auths:[]
  },

  {
    type: 'item',
    title: '网站设置',
    icon: 'mdi-application-cog',
    auths:[]
  },
]