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
                label:'顺序',
                variant:"outlined",
                fullWidth:true,
                field:'order',
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
              name:'MultiSelectBox',
              props:{
                label:"附加属性",
                variant:"outlined",
                field:'attributes',
                itemName:'name',
                multiple:true,
                fullWidth:true,
                //dataApi:{
                //  ...API_LIST_MODEL,
                //  params:{
               //     modelName:'/Model/ArticleAttribute',
                //  }                              
               // }
              },                         
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
              name:'SwitchBox',
              props:{
                label:'发布',
                fullWidth:true,
                field:'status',
                color:'primary',
                onValue:'PUBLISHED'
              },                     
            }
          ]
        },
      ]
    }
  ]
}
