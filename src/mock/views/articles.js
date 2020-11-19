import {JUMP_TO_PAGE_ACTION} from "admin/views/Page/PageAction"
export default {
  //initAction:{
  //  method:'get',
  //  url:'/api/data/list',
  //  data:{
  //    modelName:'/RXDrag/Model/Article',
  //  },      
  //},
  fields:[
  ],
  withoutForm:true,
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
      },
      children: [
          {
              name: 'GridColumn',
              children: [{
                  name: 'h2',
                  props:{
                    rxText: '文章列表',
                  }
                  
              }],
          },
          {
            name: 'GridColumn',
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
            name: 'GridColumn',
            props: {
              xs:12,
            },
            children: [          {
              name:'ListView',
              props:{
                //field:'paginate',
                //noValidation: true,
                withActions:true,
                elevation:6,
                columns:[
                  {
                    field:'name',
                    label:'名称',
                    searchable:true,
                    sortable:true,
                    props:{
                      align:'right',
                    }

                  },
                  {
                    field:'title',
                    label:'标题',
                    sortable:true,
                    template:'<span style="color:red;">{$title}</span>',
                    props:{
                    }
                  }
                ],
                rowsPerPageOptions:'10,25,50',
                defalutRowsPerPage:'10',
                filters:[
                  {
                    slug:'gender',
                    label:'性别',
                    searchable:true,
                    conditions:[
                      {
                        slug:'male',
                        label:'男'
                      },
                      {
                        slug:'female',
                        label:'女'
                      },
                    ]
                  },
                  {
                    slug:'publish',
                    label:'已发布',
                    conditions:[
                      {
                        slug:'published',
                        label:'已发布男'
                      },
                      {
                        slug:'not-published',
                        label:'未发布'
                      },
                    ]

                  }
                ],
                batchCommands:[
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
                ],
                rowCommands:[
                  {
                    slug:"edit",
                    label:"编辑",
                    icon:"mdi-pencil",
                    jumpToPage:{
                      //name: JUMP_TO_PAGE_ACidTION,
                      moduleId:'articles',
                      pageId:'article',
                      param:'id',
                      paramField:'id',
                    }
                  },
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
                ],
                bind:{
                  method:'post',
                  url:'/api/data/list',
                  params:{
                    modelName:'/RXDrag/Model/Article',
                    command:'query',//'PAGE-ACTION'
                    //commandSlug:'delete',
                    selected:[],
                    query:{
                      keyword:'text',
                    },
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
