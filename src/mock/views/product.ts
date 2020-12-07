import {GO_BACK_ACTION} from "admin/views/Page/PageAction";
import {API_GET_MODEL_BY_ID, API_LIST_MODEL} from "APIs/model"
import { API_GET_MODEL_TREE } from "APIs/tree";

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
            rxText: '产品编辑',            
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
        spacing: 2,
      },
  
      children: [{
          name: 'GridColumn',
          props: {
            md: 8,
          },
          children: [
            {
              name:'MediasPortlet',
              props: {
                elevation: 6,
                //cols:3,
                field:'medias',
                //marginTop:2,  
               },
            },
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'基本信息',
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
                        xs:12,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'名称',
                            variant:"outlined",
                            fullWidth:true,
                            field:'name',
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
                    label:'型号',
                    input:{
                      name:'SelectBox',
                      props:{
                        variant:"outlined",
                        size:'small',
                        withoutEmpertyItem:false,                        
                        items:[
                          {
                            slug:'100',
                            label:'100'
                          },
                          {
                            slug:'200',
                            label:'200'
                          },
                          {
                            slug:'300',
                            label:'300'
                          }
                        ]
                      }
                    },
                  },
                  {
                    field:'stock',
                    label:'库存',
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

            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'产品详情',
                collapsible: true,
                marginTop:2,
              },
              children:[
                {
                  name:"TinyMCE",
                  props:{
                    field:'content'
                  }

                }
              ]
            },

          ]
        },
        {
          name: 'GridColumn',
          props: {
            md: 4,
          },
          children: [
            {
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
                  name:"PortletGridContainer",
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
                            dataApi:{
                              ...API_GET_MODEL_TREE,
                              params:{
                                modelName:'/Model/ProductCategory',
                              },                               
                            },

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
                            api:{
                              ...API_LIST_MODEL,
                              params:{
                                modelName:'/Model/ProductAttribute',
                              }                              
                            }
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
            },

            {
              name:'OneToOnePortlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'SEO Meta',
                collapsible: true,
                marginTop:2,
                field:'seoMeta',
              },
              children:[
                {
                  name:'PortletGridContainer',
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
                            label:'标题',
                            variant:"outlined",
                            fullWidth:true,
                            field:'title',
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
                          name:'TextBox',
                          props:{
                            label:'关键词',
                            variant:"outlined",
                            fullWidth:true,
                            multiline:true,
                            rows:2,
                            field:'keywords',
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
                          name:'TextBox',
                          props:{
                            label:'描述',
                            variant:"outlined",
                            fullWidth:true,
                            multiline:true,
                            rows:3,
                            field:'description',
                          }
                        }
                      ]
                    },
                  ],
                }
              ],
            },

          ]
        }
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
