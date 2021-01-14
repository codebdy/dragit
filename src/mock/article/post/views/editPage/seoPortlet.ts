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
      props:{
        field:'seoMeta',
      },
      children:[
        {
          name: 'PortletGridItem',
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
                rule:{
                  valueType:'string',
                  required:true,
                } 
              }
            }
          ]
        },

        {
          name: 'PortletGridItem',
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
          name: 'PortletGridItem',
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