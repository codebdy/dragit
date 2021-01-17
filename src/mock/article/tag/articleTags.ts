import { OPEN_PAGE_ACTION } from "Base/PageUtils/ACTIONs"
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
                    rxText: '标签列表',
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
                  //size: "large",
                  onClick:{
                    name: OPEN_PAGE_ACTION,
                    page:{
                      moduleSlug:'article-tag',
                      pageSlug:'article-tag-edit',
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
              withActions:true,
              props:{
                //field:'paginate',
                //noValidation: true,
                elevation:6,
                columns:[
                  {
                    field:'name',
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
                defalutRowsPerPage:10,
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
                      moduleSlug:'article-tag',
                      pageSlug:'article-tag-edit',
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

              }
            }],
          }

      ]
    },
  ] 
}
