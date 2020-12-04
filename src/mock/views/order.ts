import {GO_BACK_ACTION} from "admin/views/Page/PageAction";
import {API_GET_MODEL_BY_ID, API_LIST_MODEL} from "APIs/model"

export default {
  layout:[{
    name: 'GridRow',
    props: {
      justify: 'space-between',
      alignItems: "center",
    },
    children: [{
        name: 'GridColumn',
        children: [{
          name: 'h2',
          props:{
            rxText: '订单编辑',            
          }

        }],
      },
      {
        name: 'GridColumn',
        children: [
          {
            name: 'Button',
            props: {
              variant: "outlined",
              rxText: '取消',
              size:'large',
              onClick:{
                name: GO_BACK_ACTION,
                careDuty: true, //如果有修改，显示保存提示
              }
            }
          },
          {
          name: 'Button',
          props: {
            rxText: '保存',
            variant: "contained",
            color: "primary",
            type: "submit",
            size:'large',
            marginLeft:2,
            //size: "large",
            //onClick:{
            //  name: POST_DATA_ACTION,
            //  slug:'save',
            //  needGoBack:true,
            //}            
          }
        }]
      },
    ]
  },
  {
      name: 'GridRow',
      props: {
        spacing: 3,
      },
  
      children: [{
          name: 'GridColumn',
          props: {
            xs: 12,
          },
          children: [
            {
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
                  name:'PortletGridContainer',
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
                            api:{
                              url: API_LIST_MODEL.url,
                              params:{
                                modelName:'/Model/Customer',
                              }
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
            },
            {
              name:'OneToManyPortlet',

              designProps:{
                isDeisgning:true,
              },
              props:{
                field:'onetoManyField',                
                title:'工厂合同',
                elevation: 6,
                marginTop: 2,
                collapsible:true,
                open:true,
              },
              children:[
                {
                  name:'PortletGridContainer',
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
                            label:'工厂',
                            variant:"outlined",
                            fullWidth:true,
                            field:'title',
                            size:'small',
                            rule:{
                              valueType:'string',
                              required:true,
                            },
                            api:{
                              url: API_LIST_MODEL.url,
                              params:{
                                modelName:'/Model/Supplier',
                              }
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
                            InputLabelProps:{
                              shrink: true,
                            },
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
                        xs:6,
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
                            InputLabelProps:{
                              shrink: true,
                            },
                            field:'date1',
                          },
                        }
                      ],
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
                            label:'实际发货日期',
                            variant:"outlined",
                            fullWidth:true,
                            size:"small",
                            type:'date',
                            InputLabelProps:{
                              shrink: true,
                            },
                            field:'date2',
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
                            label:'第一次付款日期',
                            variant:"outlined",
                            fullWidth:true,
                            size:"small",
                            type:'date',
                            InputLabelProps:{
                              shrink: true,
                            },
                            field:'pay_date1',
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
                            label:'第一次付款金额',
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
                            label:'汇率',
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
                            label:'第二次付款日期',
                            variant:"outlined",
                            fullWidth:true,
                            size:"small",
                            type:'date',
                            InputLabelProps:{
                              shrink: true,
                            },
                            field:'pay_date2',
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
                            label:'第二次付款金额',
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
                            label:'汇率',
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

                    },
                    
                  ],
                }
              ],
            },

            {
              name:'OneToManyTable',
              props: {
                elevation: 6,
                title:'规格库存',
                collapsible: true,
                marginTop:2,
                open:true,
                size:"small",
                field:'specs',
                columns:[
                  {
                    field:'image',
                    label:'图片',
                    input:{
                      name:'MediaSelect',
                      props:{
                        width:'60px',
                      }
                    }
                  },
                  {
                    field:'name',
                    label:'名称',
                    props:{
                      width:'200px',
                    },

                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'color',
                    label:'颜色',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'category',
                    label:'分类',
                    input:{
                      name:'SelectBox',
                      props:{
                        variant:"outlined",
                        size:'small',
                        withoutEmpertyItem:false,                        
                        url:'/api/base/items',
                      }
                    },        
                  },


                ]         
              },            
            },
          ]
        },
      ]
    }
  ],


  isFormPage:true,
  api:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Product',
    },      
  },

  
}
