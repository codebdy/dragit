
export default            {
  name:'Portlet',
  props: {
    elevation: 6,
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
              name:'TreeSelect',
              props:{
                label:"分类",
                variant:"outlined",
                field:'channel',
                fullWidth:true,
                multiSelect:true,
                //size:"small",

                rule:{
                  //required:true,
                },
              },        
            }
          ],
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
                field:'published',
                color:'primary',
              },                     
            }
          ]
        },
      ]
    }
  ]
}