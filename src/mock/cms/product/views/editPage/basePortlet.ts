
export default{
  name:'Portlet',
  props: {
    variant:'outlined',
    open:true,
    withHeader:true,
    title:'基本信息',
    collapsible: true,
    marginTop:2, 
  },
  children:[
    {
      name:'FormGridContainer',
      props: {
        spacing: 2,
      },
      children:[
        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              field:'name',
              rule:{
                valueType:'string',
                required:true,
              },  
              props:{
                label:'名称',
                variant:"outlined",
                fullWidth:true,
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
              field:'rx_slug',
              props:{
                label:'Slug',
                variant:"outlined",
                fullWidth:true,
                //required:true,
              },
            }
          ]
        },

        {
          name:"FormGridItem",
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                fullWidth: true,
                label:'简介',
                variant:"outlined",
                //size:"small",
                multiline:true,
                rows:5,
              }                        
            }
          ]

        }
        
      ]
    },
  ]
}