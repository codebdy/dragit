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
              md:12,
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
            md:8,
          },
          children:[
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'客户增长',
                //collapsible: true,
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
                            chart:'Line',
                            api:{
                              url:'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
                              method:'get',
                            },
                            xField: 'year',
                            yField: 'gdp',
                            seriesField: 'name',
                            yAxis: `{
                              label: {
                                formatter: function formatter(v) {
                                  return ''.concat((v / 1000000000).toFixed(1), ' B');
                                },
                              },
                            }`,
                            legend: { position: 'top' },
                            smooth: true,
                            animation: {
                              appear: {
                                animation: 'path-in',
                                duration: 5000,
                              },
                            },
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
            md:4,
          },
          children:[
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'盈利率',
                //collapsible: true,
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
                            chart:'Liquid',
                            percent: 0.65,
                            statistic: {
                              content: {
                                style: {
                                  fontSize: 60,
                                  fill: 'black',
                                },
                              },
                            },
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
      ]
    },
  ] 
}
