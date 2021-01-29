export default {
  name:'Portlet',
  props: {
    elevation: 6,
    open:true,
    withHeader:true,
    title:'提成核算',
    collapsible: true,
    marginTop:2,
  },
  children:[
    {
      name:"FormGridContainer",
      children:[
        {
          name: 'PortletGridItem',
          props:{
            xs:6,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'毛利',
                variant:"outlined",
                fullWidth:true,
                disabled:true,
                field:'gross_profit',
                size:'small',
              }
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:6,                      
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:"提成支付比例",
                variant:"outlined",
                type:'number',
                field:'commission_percent',
                fullWidth:true,
                size:'small',
              },                         
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:6,                      
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:"应付提成",
                variant:"outlined",
                type:'number',
                field:'commission_should',
                fullWidth:true,
                disabled:true,
                size:'small',
              },                         
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:6,                      
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:"实付提成",
                variant:"outlined",
                type:'number',
                field:'commission',
                fullWidth:true,
                size:'small',
              },                         
            }
          ]
        },

      ]
    }
  ]
}
