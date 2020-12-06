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
            children:[
              {
                name:'Portlet',
                props: {
                  elevation: 6,
                  open:true,
                  withHeader:true,
                  title:'成本走势图',
                  collapsible: true,
                  marginTop:2,
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
                            name:'AntDesignChart',
                            props:{
                              chart:'Area',
                              api:{
                                url:'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
                                method:'get',
                              },
                              xField: 'Date',
                              yField: 'scales',
                              xAxis: { tickCount: 5 },
                              areaStyle:{ fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
        },
        {
          name: 'GridColumn',
          props:{
            xs:6,
          },
          children: [{
              name: 'h2',
              props:{
                rxText: '66',
              }
              
          }],
        },
        {
          name: 'GridColumn',
          props:{
            xs:3,
          },
          children: [{
              name: 'h2',
              props:{
                rxText: '33',
              }
              
          }],
        },
        {
          name: 'GridColumn',
          props:{
            xs:3,
          },
          children: [{
              name: 'h2',
              props:{
                rxText: '33',
              }
              
          }],
        },

      ]
    },
  ] 
}
