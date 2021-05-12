import { 
  OPEN_PAGE_ACTION, 
  REMOVE_LIST_VIEW_RECORD, 
} from "Base/PageUtils/ACTIONs";
import listViewToolbar from "./listViewToolbar";

export default {
  name:'ListView',
  withNode:true,
  props:{
    variant:'outlined',
    //query:'rxUsers',
    //remove:'removeRxUsers',
    update:{
      //name:'updateRxUsers',
      //variableType:'RxUserInput',
      //variableName:'user',
    }
  },
  children:[
    listViewToolbar,
    {
      name:'ListViewBody',
      withNode:true,
      children:[
        {
          name:'TableColumn',
          props:{
            label:'图片',                  
          },
          children:[{
            name:'MediaView',
            field:'field1',
            props:{
              width:'60px',
            }
          }]
        },
        {
          name:'TableColumn',
          props:{
            label:'排序文字',
            field:'field2',
            searchable:true,
            sortable:true,
          },
    
          children:[{
            name:'TextView',
            field:'field2',
          }]
        },
        {
          name:'TableColumn',
          props:{
            label:'文字2',
            field:'name',
          },
    
          children:[{
            name:'TextView',
            field:'field2',
          }]
        },

        {
          name:'TableColumn',
          props:{
            label:'循环',
          },
    
          children:[
            {
              name:'LoopPanel',
              field:'roles',
              props:{
                separator:', '
              },
              children:[
                {
                  name:'TextView',
                  field:'field3',
                }
              ]
            }
          ]
        },

        {
          name:'TableColumn',
          props:{
            label:'状态',
          },
          children:[{
            name:'EnumView',
            field:'field4',
            props:{
              metas:[
                {
                  value:'NORMAL',
                  color:'default',
                  name:'正常'
                },
                {
                  value:'FORBID',
                  color:'secondary',
                  name:'禁用'
                }
              ]
            }
          }]
        },
        {
          name:'TableColumn',
          props:{
            label:'时间',
            field:'feild5',
            searchable:true,
            sortable:true,
          },
          children:[{
            name:'DayView',
            field:'feild5',
          }],
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
                icon:'mdi-pencil',
                tooltip:'编辑',
                onClick:{
                  name: OPEN_PAGE_ACTION,
                  pageJumper: {openStyle: "POPUP", pageId: "guid-p-u-2"},
                }
              }
            },
            {
              name:'JsxTemplateParser',
              fieldsGql:' is_supper ',   
              props:{
              actions:{
                remove:{
                  name: REMOVE_LIST_VIEW_RECORD,
                  confirmMessage:'删除后将不可恢复，您确定要删除吗？',
                }
              },
              //暂时不支持这种写法：!model.is_supper 
              template:`
                {
                  model.is_supper !== true &&
                  <IconButton icon='mdi-delete' tooltip='删除' onClick={remove} />
                }
                `
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
