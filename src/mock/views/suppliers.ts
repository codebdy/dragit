import { API_QUERY_AND_OPERATE_MODELS } from "APIs/model"
import {OPEN_PAGE_ACTION} from "base/PageAction"
export default {
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
          marginTop:2,
      },
      children: [
          {
              name: 'GridColumn',
              children: [{
                  name: 'h2',
                  props:{
                    rxText: '供应商列表',
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
                  name: OPEN_PAGE_ACTION,
                  page:{
                    moduleSlug:'supplier',
                    pageSlug:'supplier-edit',
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
                    field:'products',
                    label:'主营产品',
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
                defalutRowsPerPage:10,
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
                      moduleSlug:'supplier',
                      pageSlug:'supplier-edit',
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
                dataApi:{
                  ...API_QUERY_AND_OPERATE_MODELS,
                  params:{
                    modelName:'/Model/Supplier',
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
