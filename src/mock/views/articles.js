import {JUMP_TO_PAGE_ACTION} from "admin/views/Page/PageAction"
export default {
  initAction:{
    method:'get',
    url:'/api/data/list',
    data:{
      modelName:'/RXDrag/Model/Article',
    },      
  },
  //不带验证表单
  widthForm:false,
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
                    searchable:true,
                    props:{
                      align:'right',
                    }

                  },
                  {
                    field:'title',
                    label:'标题',
                    sortable:true,
                    props:{
                    }
                  }
                ],

                filters:[
                  {
                    slug:'gender',
                    label:'性别',
                    searchable:true,
                    conditions:[
                      {
                        slug:'male',
                        label:'男'
                      }
                    ]
                  },
                  {
                    slug:'publish',
                    label:'已发布',

                  }
                ],
                batchActions:[
                  {
                    slug:"publish",
                    label:"发布",
                    icon:"mdi-publish",
                  },
                  {
                    slug:"check",
                    label:"审核",
                    icon:"mdi-check-bold",
                  },
                  {
                    slug:"delete",
                    label:"删除",
                    icon:"mdi-delete",
                  },
                ]

              }
            }],
          }

      ]
    },
  ] 
}
