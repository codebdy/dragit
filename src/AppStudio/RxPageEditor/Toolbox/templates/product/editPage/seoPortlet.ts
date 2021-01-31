export default{
  name:'Portlet',
  props: {
    elevation: 6,
    open:true,
    withHeader:true,
    title:'SEO Meta',
    collapsible: true,
    marginTop:2,
    field:'seoMeta',
  },
  children:[
    {
      name:'FormGridContainer',
      children:[
        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'标题',
                variant:"outlined",
                fullWidth:true,
                field:'title',
              }
            }
          ]
        },

        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'关键词',
                variant:"outlined",
                fullWidth:true,
                multiline:true,
                rows:2,
                field:'keywords',
              }
            }
          ]
        },

        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'描述',
                variant:"outlined",
                fullWidth:true,
                multiline:true,
                rows:3,
                field:'description',
              }
            }
          ]
        },


      ],
    }
  ],
}