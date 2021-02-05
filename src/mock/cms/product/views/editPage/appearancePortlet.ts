export default{
  name:'Portlet',
  props: {
    variant:'outlined',
    open:true,
    withHeader:true,
    title:'显示',
    collapsible: true,
  },
  children:[
    {
      name:"FormGridContainer",
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
              field:'order',
              props:{
                label:'顺序',
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
              name:'MultiSelectBox',
              //field:'attributes',
              props:{
                label:"附加属性",
                variant:"outlined",
                itemName:'name',
                fullWidth:true,
                query:'allProductAttributes',
              },                         
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
              name:'SwitchBox',
              field:'status',
              props:{
                label:'发布',
                fullWidth:true,
                color:'primary',
                onValue:'PUBLISHED',
                offValue:'DRAFT',
              },                     
            }
          ]
        },
      ]
    }
  ]
}
