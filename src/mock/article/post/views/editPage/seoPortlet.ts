export default{
  name:'Portlet',
  props: {
    variant:'outlined',
    open:true,
    withHeader:true,
    title:'SEO Meta',
    collapsible: true,
    marginTop:2,
  },
  children:[
    {
      name:'FormGridContainer',
      field:'seoMeta',
      children:[
        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              field:'title',
              props:{
                label:'标题',
                variant:"outlined",
                fullWidth:true,
                rule:{
                  valueType:'string',
                  required:true,
                } 
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
              field:'keywords',
              props:{
                label:'关键词',
                variant:"outlined",
                fullWidth:true,
                multiline:true,
                rows:2,
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
              field:'description',
              props:{
                label:'描述',
                variant:"outlined",
                fullWidth:true,
                multiline:true,
                rows:3,
              }
            }
          ]
        },
      ],
    }
  ],
}