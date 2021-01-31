import { POPUP_STYLE_MODULE } from "Utils/consts";

export var demoDrawerData= [{
    //type:subheader, item, group
    type: 'subheader',
    title: '功能演示',
  },
  {
    type: 'item',
    title: '独立提交',
    icon: 'mdi-arrange-send-to-back',
    pageId: `guid-p-1`
  },
  {
    type: 'item',
    title: '1对多面板',
    icon: 'mdi-file-tree',
    pageId: `guid-p-2`
  },
  {
    type: 'item',
    title: '1对多表格',
    icon: 'mdi-table',
    pageId: `guid-p-3`
  },

  {
    title: '跳转样式',
    type: 'group',
    icon: 'mdi-open-in-new',
    children: [
      {
          title: '页面跳转式',
          type: 'item',
          icon: 'mdi-circle-small',
          pageId: 'guid-p-4',
      },
      {
          title: '对话框式',
          type: 'item',
          icon: 'mdi-circle-small',
          to: 'popup-style-module',
      },
      {
          title: '右侧滑出式',
          type: 'item',
          icon: 'mdi-circle-small',
          to: POPUP_STYLE_MODULE + 2,
      },
    ],
  },
  {
      type: 'subheader',
      title: '菜单演示',
  },
  {
      id:'divider1',
      type:'divider',
  },
  {
      id: "3",
      title: '多级嵌套',
      type: 'group',
      icon: 'mdi-file-tree-outline',
      children: [{
              id: "3-1",
              title: '层级2',
              type: 'group',
              to: { name: 'dashboard' },
              icon: 'mdi-chart-line',
              children: [{
                      id: "3-2-1",
                      title: '层级3',
                      type: 'item',
                      to: { name: 'dashboard' },
                      icon: 'mdi-brightness-percent',
                      badge: {
                          color: 'secondary',
                          label: 'temp2',
                          size: 'small',
                      }
                  },

              ]
          },
          {
              id: "3-2",
              title: '文章列表',
              type: 'item',
              to: { name: 'dashboard' },
              icon: 'mdi-tree-outline',
              chip: {
                  color: 'primary',
                  label: '很牛',
                  size: 'small',
              },
          },

      ],
  },

]