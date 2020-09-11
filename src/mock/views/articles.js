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
                  props:{
                    rxText: '文章列表',
                  }
                  
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
              props: {
                variant: "contained",
                color: "primary",
                rxText: '新建',
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
          {
            name: 'Grid',
            props: {
              item: true,
              xs:12,
            },
            children: [          {
              name:'ListView',
              props:{
                field:'records',
                columns:[
                  {
                    field:'name',
                    label:'名称',
                    props:{
                      align:'right',
                    }

                  },
                  {
                    field:'title',
                    label:'标题',
                  }
                ]
              }
            }],
          }

      ]
    },
  ] 
}
