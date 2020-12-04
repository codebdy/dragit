import {API_QUERY_AND_OPERATE_MODELS} from "APIs/model"
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
                    rxText: '通知列表',
                  }
                  
              }],
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
                    field:'title',
                    label:'名称',
                    searchable:true,
                    sortable:true,
                  },
                  {
                    field:'created_at',
                    label:'时间',
                  },
                ],
                rowsPerPageOptions:'10,25,50',
                defalutRowsPerPage:'10',
                batchCommands:[
                  {
                    slug:"setRead",
                    label:"设为以读",
                    icon:"mdi-email-open",
                  },
                  {
                    slug:"delete",
                    label:"删除",
                    icon:"mdi-delete",
                  },
                ],
                rowCommands:[
                  {
                    slug:"view",
                    label:"查看",
                    icon:"mdi-magnify",
                    jumpToPage:{
                      moduleSlug:'notification',
                      pageSlug:'view-notification',
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
                    modelName:'/Model/Notification',
                  },      
                },

              }
            }],
          }

      ]
    },
  ] 
}
