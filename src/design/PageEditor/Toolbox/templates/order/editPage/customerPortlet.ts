
export default              {
  name:'Portlet',
  props: {
    elevation: 6,
    open:true,
    withHeader:true,
    title:'客户合同',
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
            md:4,
          },
          children:[
            {
              name:'SelectBox',
              props:{
                label:'客户',
                variant:"outlined",
                fullWidth:true,
                field:'title',
                size:'small',
                rule:{
                  valueType:'string',
                  required:true,
                },
                        
                
              }
            }
          ]
        },

        {
          name: 'PortletGridItem',
          props:{
            xs:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'合同日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'contract_date',
              },
            }
          ],
        },

        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'合同号',
                variant:"outlined",
                fullWidth:true,
                size:'small',
                field:'contract_no',
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
            md:4,
          },
          children:[
            {
              name:'SelectBox',
              props:{
                label:'付款方式',
                variant:"outlined",
                fullWidth:true,
                size:'small',
                field:'payment_term',
                withoutEmpertyItem:true,
                items:[
                  {
                    slug:'100-0',
                    label:'T/T 100%/0%'
                  },
                  {
                    slug:'50-50',
                    label:'T/T 50%/50%'
                  },                              
                  {
                    slug:'30-70',
                    label:'T/T 30%/70%'
                  },

                  {
                    slug:'20-80',
                    label:'T/T 20%/80%'
                  },
                ]
              }
            }
          ]
        },

        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'SelectBox',
              props:{
                label:'币种',
                variant:"outlined",
                fullWidth:true,
                size:'small',
                field:'currency',
                withoutEmpertyItem:true,
                items:[
                  {
                    slug:'dollor',
                    label:'美元'
                  },
                  {
                    slug:'euro',
                    label:'欧元'
                  },                              
                  {
                    slug:'rmb',
                    label:'人民币'
                  },

                ]
              }
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'合同金额',
                variant:"outlined",
                type:'number',
                fullWidth:true,
                size:'small',
                field:'amount',
              }
            }
          ]
        },

        {
          name: 'PortletGridItem',
          props:{
            md:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'货物描述',
                variant:"outlined",
                fullWidth:true,
                multiline:true,
                size:'small',
                rows:5,
                field:'cargo_description',
              },
            }
          ],
        },

        {
          name: 'PortletGridItem',
          props:{
            xs:3,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'预计发货日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'date1',
              },
            }
          ],
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:3,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'实际发货日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'date2',
              },
            }
          ],
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:3,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'预计到港日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'date4',
              },
            }
          ],
        },
        {
          name: 'PortletGridItem',
          props:{
            xs:3,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'实际到港日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'date4',
              },
            }
          ],
        },

        {
          name: 'PortletGridItem',
          props:{
            xs:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'第一次收汇日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'first_receive_date',
              },
            }
          ],
        },
        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'第一次收费金额',
                variant:"outlined",
                type:'number',
                fullWidth:true,
                size:'small',
                field:'payment1',
              }
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'第一次结汇汇率',
                variant:"outlined",
                type:'number',
                fullWidth:true,
                size:'small',
                field:'exchange1',
              }
            }
          ]
        },

        {
          name: 'PortletGridItem',
          props:{
            xs:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'第二次收汇日期',
                variant:"outlined",
                fullWidth:true,
                size:"small",
                type:'date',
                shrinkLabel:true,
                field:'receive_date2',
              },
            }
          ],
        },
        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'第二次收费金额',
                variant:"outlined",
                type:'number',
                fullWidth:true,
                size:'small',
                field:'payment2',
              }
            }
          ]
        },
        {
          name: 'PortletGridItem',
          props:{
            md:4,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'第二次结汇汇率',
                variant:"outlined",
                type:'number',
                fullWidth:true,
                size:'small',
                field:'exchange2',
              }
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
                label:'备注',
                variant:"outlined",
                //size:"small",
                multiline:true,
                rows:3,
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
