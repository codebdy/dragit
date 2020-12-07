import {JUMP_TO_PAGE_ACTION} from "base/PageAction"
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
                    rxText: '订单列表',
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
                    moduleSlug:'order',
                    pageSlug:'order-edit',
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
                    field:'contract_no',
                    label:'合同号',
                    sortable:true,
                    //template:'<span style="color:red;">{$title}</span>',
                    props:{
                    }
                  },
                  {
                    field:'customer',
                    label:'客户',
                    sortable:true,
                  },
                  {
                    field:'amount',
                    label:'合同金额',
                    sortable:true,
                  },
                  {
                    field:'percent',
                    label:'收款比例',
                  },
                  {
                    field:'commission',
                    label:'已付提成',
                  },
                  {
                    field:'created_at',
                    label:'合同日期',
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
                      moduleSlug:'order',
                      pageSlug:'order-edit',
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
                    modelName:'/Model/Order',
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
