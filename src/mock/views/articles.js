import {JUMP_TO_PAGE_ACTION} from "admin/views/Page/FormAction"
export default {
  initAction:{
    method:'get',
    url:'/api/data/list',
    data:{
      modelName:'/RXDrag/Model/Article',
    },      
  },
  fields:[
  ],
  layout:[
    {
      name: 'Grid',
      props: {
          container: true,
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
      },
      children: [{
              name: 'Grid',
              props: {
                item: true,
              },
              children: [{
                  name: 'h2',
                  text: '文章列表',
              }],
          },
          {
            name: 'Grid',
            //text: 'test',
            props: {
              item: true,
            },
            children: [
            {
              name: 'Button',
              text: '新建',
              props: {
                variant: "contained",
                color: "primary",
                //size: "large",
                style: {
                  fontSize: '1.1rem',
                },
                onClick:{
                  name: JUMP_TO_PAGE_ACTION,
                  page:{
                    moduleId:'articles',
                    pageId:'article',
                    dataId:'1',
                  }
                }
              }
            }]
          },
      ]
    },
  ] 
}
