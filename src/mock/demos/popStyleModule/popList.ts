import { OPEN_PAGE_ACTION } from "Base/Action/ACTIONs"

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
                    rxText: '用户列表',
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
                  name: OPEN_PAGE_ACTION,
                  page:{
                    id:'112',
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
                query:null,
              },
              withActions:true,
              props:{
                //elevation:6,
                columns:[
                  {
                    field:'login_name',
                    label:'登录名',
                    //searchable:true,
                    //sortable:true,
                  },
                  {
                    field:'name',
                    label:'名称',
                    searchable:true,
                    sortable:true,
                  },
                  {
                    field:'email',
                    label:'邮箱',
                  },
                  {
                    field:'roles',
                    label:'角色',
                  },
                  {
                    field:'status',
                    label:'状态',
                    isHtml:true,
                    props:{
                    }
                  }
                ],
                rowsPerPageOptions:'10,25,50',
                defalutRowsPerPage:10,
                filters:[
                  {
                    slug:'status',
                    label:'状态',
                    searchable:true,
                    conditions:[
                      {
                        slug:'normal',
                        label:'正常'
                      },
                      {
                        slug:'forbid',
                        label:'禁用'
                      },
                    ]
                  },
                ],
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
                      pageId:'112',
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
                query:'users',
                mutation:'updateUsers',
              },
            }],
          }

      ]
    },
  ] 
}
