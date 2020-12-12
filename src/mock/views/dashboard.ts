import { AUTH_DASHBOARD } from "APIs/authSlugs";

export default {
  layout:[
    {
      name: 'GridRow',
      props: {
        justify: 'space-between',
        alignItems: "center",
        spacing: 2,
      },
      children: [
        {
            name: 'GridColumn',
            props:{
              md:12,
              xs:12,
              xm:12,
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
                    name:"FormGridContainer",
                    children:[
                      {
                        name: 'PortletGridItem',
                        props:{
                          xs:12,
                        },
                        children:[
                          {
                            name:'AntDesignChart',
                            designProps:{
                              dataApi:null,
                              isDeisgning:true,
                            },
                            props:{
                              chart:'Area',
                              dataApi:{
                                url:'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
                                method:'get',
                              },                             
                              jsonProps:{
                                xField: 'Date',
                                yField: 'scales',
                                xAxis: { tickCount: 5 },
                                areaStyle:{ fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
                              }                              
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
            sm:12,
            xs:12,
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
                  name:"FormGridContainer",
                  children:[
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'AntDesignChart',
                          designProps:{
                            dataApi:null,
                            isDeisgning:true,
                          },
                          props:{
                            chart:'Line',
                            dataApi:{
                              url:'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
                              method:'get',
                            },                            
                            jsonProps:{
                              xField: 'year',
                              yField: 'gdp',
                              seriesField: 'name',
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
            sm:12,
            xs:12
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
                  name:"FormGridContainer",
                  children:[
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'AntDesignChart',
                          designProps:{
                            dataApi:null,
                            isDeisgning:true,
                          },
                          props:{
                            chart:'Radar',                            
                            jsonProps:{
                              data:[
                                { name: 'G2', star: 10178 },
                                { name: 'G6', star: 7077 },
                                { name: 'F2', star: 7345 },
                                { name: 'L7', star: 2029 },
                                { name: 'X6', star: 298 },
                                { name: 'AVA', star: 806 },
                              ],
                              xField: 'name',
                              yField: 'star',
                              meta: {
                                star: {
                                  alias: '分数',
                                  min: 0,
                                  nice: true,
                                },
                              },
                              xAxis: {
                                line: null,
                                tickLine: null,
                              },
                              yAxis: {
                                label: false,
                                grid: {
                                  alternateColor: 'rgba(0, 0, 0, 0.04)',
                                },
                              },
                              // 开启辅助点
                              point: {},
                              area: {},
                            }

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
  ],
  auths:[
    AUTH_DASHBOARD
  ] 
}
