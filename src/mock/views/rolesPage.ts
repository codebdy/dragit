import {OPEN_PAGE_ACTION} from "base/PageAction"
import {API_QUERY_AND_OPERATE_MODELS} from "APIs/model"
export default {
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
          marginTop: 2,
      },
      children: [
          {
              name: 'GridColumn',
              children: [{
                  name: 'h2',
                  props:{
                    rxText: '角色列表',
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
                onClick:{
                  name: OPEN_PAGE_ACTION,
                  page:{
                    moduleSlug:'role',
                    pageSlug:'edit-role',
                    //dataId:'1',
                  }
                }
              }
            }]
          },
          {
            name: 'GridColumn',
            props: {
              xs:12,
              marginTop: 1,
            },
            children: [          {
              name:'ListView',
              designProps:{
                dataApi:null,
              },
              props:{
                withActions:true,
                elevation:6,
                columns:[
                  {
                    field:'name',
                    label:'名称',
                    searchable:true,
                    sortable:true,
                  },
                  {
                    field:'description',
                    label:'描述',
                  },
                  {
                    field:'forbid',
                    label:'状态',
                    isHtml:true,
                    props:{
                    }
                  }
                ],
                rowsPerPageOptions:'10,25,50',
                defalutRowsPerPage:'10',
                batchCommands:[
                  {
                    slug:"forbid",
                    label:"禁用",
                    icon:"mdi-cancel",
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
                      moduleSlug:'role',
                      pageSlug:'edit-role',
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
                    modelName:'/Model/Role',
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
