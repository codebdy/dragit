import { JUMP_TO_PAGE_ACTION } from "admin/views/Page/PageAction"
import {API_QUERY_AND_OPERATE_MODELS} from "APIs/model"
export default {
  layout:[
    {
      name: 'GridRow',
      props: {
        alignItems: "center",
        spacing: 1,
        
      },
      children: [
          {
            name: 'GridColumn',
            props: {
              xs:8,
              container:true,
              justify: 'space-between',
              alignItems: "center",
            },
            children: [
              {
                name: 'GridColumn',
                children:[
                  {
                    name: 'h2',
                    props:{
                      rxText: '属性列表',
                    }                    
                  },
                  
                ]
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
                        moduleSlug:'product-attribute',
                        pageSlug:'product-attribute-edit',
                      }
                    }
                  }
                }]
              },
    
            ],
          },

          {
            name: 'GridColumn',
            props: {
              xs:8,
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
                    field:'slug',
                    label:'标识',
                    searchable:true,
                    sortable:true,
                  },
                  {
                    field:'name',
                    label:'名称',
                    searchable:true,
                    sortable:true,
                  },
                ],
                rowsPerPageOptions:'10,25,50',
                defalutRowsPerPage:'10',
                batchCommands:[
                  {
                    slug:"delete",
                    label:"删除",
                    icon:"mdi-delete",
                  },
                ],
                rowCommands:[
                  {
                    slug:"eidt",
                    label:"编辑",
                    icon:"mdi-pencil",
                    jumpToPage:{
                      moduleSlug:'product-attribute',
                      pageSlug:'product-attribute-edit',
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
                  url:API_QUERY_AND_OPERATE_MODELS.url,
                  params:{
                    modelName:'/Model/ProductAttribute',
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
