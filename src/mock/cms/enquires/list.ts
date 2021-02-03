import { BATCH_REMOVE_LIST_VIEW_RECORDS, 
  OPEN_PAGE_ACTION, 
  REMOVE_LIST_VIEW_RECORD, 
} from "Base/PageUtils/ACTIONs";

export default {
  name:'ListView',
  withNode:true,
  props:{
    variant:'outlined',
    query:'enquiries',
    remove:'removeEnquiries',
  },
  children:[
    {
      name:'ListViewToolbar',
      children:[
        {
          name:'ListViewFilters',
          children:[
            {
              name:'ListViewKeywordFilter',
              props:{
                size:'small',
              }
            },
            {
              name:'ListViewEnumFilter',
              props:{
                marginLeft:2,
                size:'small',
                label:'状态',
                width:'120px',
                field:'already_ready',
                metas:[
                  {
                    value:false,
                    name:'未读'
                  },
                  {
                    value:true,
                    name:'已读'
                  },
                ]
              }
            }
          ]
        },

        {
          name:'ListViewBatchActions',
          children:[
            {
              name:'Button',              
              props:{
                rxText:'删除',
                //size:'small',
                variant:"contained",
                startIcon:'mdi-delete',
                color:'secondary',
                onClick:{
                  name: BATCH_REMOVE_LIST_VIEW_RECORDS,
                  confirmMessage:'删除后将不可恢复，您确定要删除吗？',
                }
              }
            },
          ]
        }
      ]
    },
    {
      name:'ListViewBody',
      withNode:true,
      children:[
        {
          name:'TableColumn',
          props:{
            label:'',
            align:'center',
            width:'50px',
          },
          children:[
            {
              name:'JsxTemplateParser',
              fieldsGql:' already_read ',   
              props:{
              template:`
              <>
                {
                  model.already_read !== true &&
                  <Avatar style={{backgroundColor:'#5d78ff', color:'#FFF'}}>
                    <MdiIcon iconClass="mdi-email" />
                  </Avatar>
                }
                {
                  model.already_read === true&&
                  <Avatar>
                    <MdiIcon iconClass="mdi-email-open-outline" />
                  </Avatar>
                }
              </>
                `
              }
            },
          ]
        },

        {
          name:'TableColumn',
          props:{
            label:'姓名',
            field:'name',
            searchable:true,
          },
    
          children:[
            {
              name:'JsxTemplateParser',
              fieldsGql:' name ',   
              props:{
              template:`
              <>
                {
                  model.already_read !== true &&
                  <b>{model.name}</b>
                }
                {
                  model.already_read === true&&
                  model.name
                }
              </>
                `
              }
            },            
          ]
        },
        {
          name:'TableColumn',
          props:{
            label:'邮箱',
            field:'email',
            searchable:true,
          },
    
          children:[
            {
              name:'JsxTemplateParser',
              fieldsGql:' email ',   
              props:{
              template:`
              <>
                {
                  model.already_read !== true &&
                  <b>{model.email}</b>
                }
                {
                  model.already_read === true&&
                  model.email
                }
              </>
                `
              }
            },            
            
          ]
        },
        {
          name:'TableColumn',
          props:{
            label:'公司',
            field:'company',
            searchable:true,
          },
    
          children:[
            {
              name:'JsxTemplateParser',
              fieldsGql:' company ',   
              props:{
              template:`
              <>
                {
                  model.already_read !== true &&
                  <b>{model.company}</b>
                }
                {
                  model.already_read === true&&
                  model.company
                }
              </>
                `
              }
            }
          ]
        },

        {
          name:'TableColumn',
          props:{
            label:'时间',
            field:'created_at',
            sortable:true,
          },
          children:[
            {
              name:'JsxTemplateParser',
              fieldsGql:' created_at ',   
              props:{
              template:`
              <>
                {
                  model.already_read !== true &&
                  <b>{model.created_at}</b>
                }
                {
                  model.already_read === true&&
                  model.created_at
                }
              </>
                `
              }
            }
          ],
        },
        {
          name:'TableColumn',
          props:{
            label:'',
            align:'right',
          },
          children:[
            {
              name:'IconButton',
              props:{
                icon:'mdi-magnify',
                tooltip:'查看',
                onClick:{
                  name: OPEN_PAGE_ACTION,
                  pageJumper: {openStyle: "POPUP", pageId: "guid-p-cms-3"},
                }
              }
            },
            {
              name:'IconButton',
              props:{
                icon:'mdi-delete',
                tooltip:'删除',
                onClick:{
                  name: REMOVE_LIST_VIEW_RECORD,
                  confirmMessage:'删除后将不可恢复，您确定要删除吗？',
                }
              }
            },
          ]
        },
      ],             
    },
    {
      name:'ListViewPagination',
      props:{
        rowsPerPageOptions: '5, 10, 25, 50, 100'
      }
    }
  ],      
}
