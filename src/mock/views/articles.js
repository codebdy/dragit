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
                type: "submit",
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
