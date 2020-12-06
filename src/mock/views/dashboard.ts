export default {
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
      },
      children: [
          {
            name: 'GridColumn',
            props:{
              xs:12,
            },
            children: [{
                name: 'h2',
                props:{
                  rxText: '分析看板',
                }
                
            }],
          },
          {
            name: 'GridColumn',
            props:{
              xs:12,
            },
            children:[
              {
                name:'Portlet',
                props: {
                  elevation: 6,
                  open:true,
                  withHeader:true,
                  title:'成本走势图',
                  collapsible: true,
                },
                children:[
                  {
                    name:"PortletGridContainer",
                    children:[
                      {
                        name: 'PortletGridItem',
                        props:{
                          xs:12,
                        },
                        children:[
                          {
                            name:'AntDesignChart'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }

      ]
    },
  ] 
}
