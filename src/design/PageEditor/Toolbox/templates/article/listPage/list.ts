export default {
  name:'ListView',
  designProps:{
    dataApi:null,
  },
  props:{
    withActions:true,
    variant:'outlined',
    //elevation:6,
    columns:[
      {
        field:'title',
        label:'标题',
        sortable:true,
        //template:'<span style="color:red;">{$title}</span>',
        props:{
        }
      },
      {
        field:'is_published',
        label:'状态',
        sortable:true,
        props:{
        }
      },
      {
        field:'created_at',
        label:'时间',
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
        confirmMessage:"删除后将不可恢复，您确定要删除吗？",
      },
    ],
    rowCommands:[
      {
        slug:"edit",
        label:"编辑",
        icon:"mdi-pencil",
        jumpToPage:{
          //name: JUMP_TO_PAGE_ACidTION,
          pageSlug:'article',
          param:'id',
          paramField:'id',
        }
      },
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
        confirmMessage:"删除后将不可恢复，您确定要删除吗？",
      },
    ],
    mutation:{
      name:'posts',
      where:{},
      orderBy:[],   
    },
  }
}
