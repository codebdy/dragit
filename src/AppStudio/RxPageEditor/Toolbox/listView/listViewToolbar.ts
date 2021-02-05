import { BATCH_REMOVE_LIST_VIEW_RECORDS, BATCH_UPDATE_LIST_VIEW_RECORDS } from "Base/PageUtils/ACTIONs";

export default{
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
            field:'status',
            metas:[
              {
                value:'normal',
                name:'正常'
              },
              {
                value:'forbid',
                name:'禁用'
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
        {
          name:'Button',              
          props:{
            rxText:'发布',
            marginLeft:2,
            //size:'small',
            variant:"contained",
            startIcon:'mdi-publish',
            onClick:{
              name: BATCH_UPDATE_LIST_VIEW_RECORDS,
              field:'status',
              value:'PUBLISHED',
            }
          }
        }

      ]
    }
  ]
}