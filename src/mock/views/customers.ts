import {JUMP_TO_PAGE_ACTION} from "admin/views/Page/PageAction"
export default {
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
                    rxText: '客户列表',
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
                size: "large",
                onClick:{
                  name: JUMP_TO_PAGE_ACTION,
                  page:{
                    moduleSlug:'customer',
                    pageSlug:'customer-edit',
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
                    sortable:true,
                  },
                  {
                    field:'country',
                    label:'国家',
                    sortable:true,
                  },
                  {
                    field:'user',
                    label:'业务员',
                  },
                  {
                    field:'created_at',
                    label:'创建日期',
                    sortable:true,
                    props:{
                    }
                  },

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
                      moduleSlug:'customer',
                      pageSlug:'customer-edit',
                      param:'id',
                      paramField:'id',
                    }
                  },
                  {
                    slug:"delete",
                    label:"删除",
                    icon:"mdi-delete",
                  },
                ],
                api:{
                  method:'post',
                  url:'/api/data/query-operate-models',
                  params:{
                    modelName:'/Model/Customer',
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
