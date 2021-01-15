import { GO_BACK_ACTION, SUBMIT_MUTATION } from "Base/PageUtlis/ACTIONs";

export default {
  layout:[{
    name: 'GridRow',
    props: {
      justify: 'space-between',
      alignItems: "center",
      spacing: 2,
      marginTop:2,
    },
    children: [{
        name: 'GridColumn',
        children: [{
          name: 'h2',
          props:{
            rxText: '供应商编辑',            
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
            size:'large',
            marginLeft:2,
            onClick:{
              name:SUBMIT_MUTATION,
            }
          }
        }]
      },
    ]
  },
  {
      name: 'GridRow',
      props: {
        spacing: 2,
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
                title:'基本信息',
                collapsible: true,
              },
              children:[
                {
                  name:'FormGridContainer',
                  children:[
                    {
                      name: 'PortletGridItem',
                      props:{
                        md:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'中文名称',
                            variant:"outlined",
                            fullWidth:true,
                            field:'name',
                            size:"small",
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
                        md:6,                      
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'英文名称',
                            variant:"outlined",
                            fullWidth:true,
                            field:'name_en',
                            size:"small",
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
                            label:'省',
                            variant:"outlined",
                            fullWidth:true,
                            field:'province',
                            size:"small",
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
                            label:'城市',
                            variant:"outlined",
                            fullWidth:true,
                            field:'city',
                            size:"small",
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
                            label:'电话',
                            variant:"outlined",
                            fullWidth:true,
                            field:'tel',
                            size:"small",
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
                            label:'网址',
                            variant:"outlined",
                            fullWidth:true,
                            field:'website',
                            size:"small",
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
                          name:'MultiSelectBox',
                          props:{
                            label:"主营产品",
                            variant:"outlined",
                            field:'product_ids',
                            itemName:'name',
                            multiple:true,
                            fullWidth:true,
                          },                         
                        },

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
                            label:'地址',
                            variant:"outlined",
                            size:"small",
                            multiline:true,
                            rows:2,
                            field:'address',
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
                            size:"small",
                            multiline:true,
                            rows:5,
                            field:'note',
                          }                        
                        }
                      ]
                    },
                    
                  ]
                },
              ]
            },

            {
              name:'OneToManyTable',
              props: {
                elevation: 6,
                title:'联系人',
                collapsible: true,
                marginTop:2,
                open:true,
                size:"small",
                field:'contacts',
                columns:[
                  {
                    field:'name',
                    label:'姓名',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'emial',
                    label:'邮箱',

                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'tel',
                    label:'电话',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'weichat',
                    label:'微信',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },

                  {
                    field:'qq',
                    label:'QQ',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },

                  {
                    field:'note',
                    label:'备注',

                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },

                ]         
              },            
            },

          ]
        },
      ]
    }
  ],


}
