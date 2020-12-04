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
                          name:'TextBox',
                          props:{
                            label:'付款方式',
                            variant:"outlined",
                            fullWidth:true,
                            size:'small',
                            field:'payment_term',
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
                            label:'币种',
                            variant:"outlined",
                            fullWidth:true,
                            size:'small',
                            field:'currency',
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
                        xs:12,                      
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'Slug',
                            variant:"outlined",
                            fullWidth:true,
                            field:'slug',
                            //required:true,
                            rule:{
                              //valueType:'string',
                              //required:true,
                            }                      
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
                            label:'作者',
                            variant:"outlined",
                            fullWidth:true,
                            field:'auther',
                            //required:true,
                            helperText:'作者提示',
                            rule:{
                              //valueType:'string',
                              //required:true,
                            }                      
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
                            label:'Email',
                            variant:"outlined",
                            fullWidth:true,
                            field:'email',
                            rule:{
                              valueType:'string',
                              ruleType:'email',
                              required:true,
                            },
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
                          name:'SelectBox',
                          props:{
                            label:"分类",
                            variant:"outlined",
                            field:'category',
                            //required:true,
                            helperText:'请选择分类',
                            fullWidth:true,
                            multiple:true,
                            rule:{
                              //required:true,
                            },
                            
                              items:[
                                {
                                  slug:'news',
                                  label:'新闻',
                                },
                                {
                                  slug:'tech',
                                  label:'技术',
                                },
                                {
                                  slug:'jingyan‘',
                                  label:'经验',
                                },
                              ]
                                      
                          }
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
                          name:'SelectBox',
                          props:{
                            label:"频道",
                            variant:"outlined",
                            field:'channel',
                            fullWidth:true,
                            xs:6,
                            required:true,
                            withoutEmpertyItem:true,                        
                            
                              url:'/api/base/items',
                            

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
                        xs:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'创作日期',
                            variant:"outlined",
                            fullWidth:true,
                            //size:"small",
                            type:'date',
                            InputLabelProps:{
                              shrink: true,
                            },
                            field:'create_date',
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
                          name:'Combobox',
                          props:{
                            label:"标签",
                            variant:"outlined",
                            field:'tags',
                            multiple:false,
                            //required:true,
                           
       
                              items:[
                                {
                                  slug:'product',
                                  label:'产品',
                                },
                                {
                                  slug: 'iPhone',
                                  label:'iPhone',
                                },
                                {
                                  slug:'apple',
                                  label:'苹果',
                                },
                              ],
                             

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
                          name:'Combobox',
                          props:{
                            label:"标签2",
                            variant:"outlined",
                            field:'tags2',
                            multiple:true,
                            fullWidth:true,
                            
                              url:'/api/base/items',

                            rule:{
                              //required:true,
                            },
                          },                         
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
                            label:'简介',
                            variant:"outlined",
                            //size:"small",
                            multiline:true,
                            rows:5,
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
            {
              name:'OneToManyPortlet',

              designProps:{
                isDeisgning:true,
              },
              props:{
                field:'onetoManyField',                
                title:'1对多面板',
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
                        xs:3,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'合同号',
                            variant:"outlined",
                            fullWidth:true,
                            size:"small",
                            field:'no',
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
                        xs:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'供应商',
                            variant:"outlined",
                            fullWidth:true,
                            field:'supplier',
                            size:"small",
                          }
                        }
                      ]
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
                            label:'日期',
                            variant:"outlined",
                            fullWidth:true,
                            size:"small",
                            field:'date',
                          }
                        }
                      ]
                    },

                  ],
                }
              ],
            }
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
