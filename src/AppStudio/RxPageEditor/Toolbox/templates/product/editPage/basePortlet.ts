
export default{
  name:'Portlet',
  props: {
    elevation: 6,
    open:true,
    withHeader:true,
    title:'基本信息',
    collapsible: true,
    marginTop:2,              
  },
  children:[
    {
      name:'FormGridContainer',
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
                label:'名称',
                variant:"outlined",
                fullWidth:true,
                field:'name',
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
                label:'Slug',
                variant:"outlined",
                fullWidth:true,
                field:'slug',
                //required:true,
                rule:{
                  //valueType:'string',
                  //required:true,
                }                      
              },
            }
          ]
        },
        {
          name:"PortletGridItem",
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
    {
      name:'PortletFooter',
      text:'Footer',
    }
  ]
}