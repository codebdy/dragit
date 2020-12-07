import {GO_BACK_ACTION} from "admin/views/Page/PageAction";
import {API_GET_MODEL_BY_ID, API_LIST_MODEL} from "APIs/model"
import { API_GET_MODEL_TREE } from "APIs/tree";

export default {
  layout:[{
    name: 'GridRow',
    props: {
      justify: 'space-between',
      alignItems: "center",
      marginTop: 2,
    },
    children: [{
        name: 'GridColumn',
        children: [{
          name: 'h2',
          props:{
            rxText: '文章编辑',            
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
            md: 8,
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
                        xs:6,
                      },
                      children:[
                        {
                          name:'TreeSelect',
                          designProps:{
                            dataApi:null,
                            isDeisgning:true,
                          },
                          props:{
                            label:"频道",
                            variant:"outlined",
                            field:'channel',
                            fullWidth:true,
                            multiSelect:true,
                            //size:"small",
                            xs:6,
                            dataApi:{
                              ...API_GET_MODEL_TREE,
                              params:{
                                modelName:'/Model/ArticleChannel',
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
                          name:'Combobox',
                          props:{
                            label:"标签",
                            variant:"outlined",
                            field:'tags',
                            multiple:true,
                            fullWidth:true,
                            api:{
                              url: API_LIST_MODEL.url,
                              params:{
                                modelName:'/Model/Tag',
                              }
                            },
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
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'内容',
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
                                modelName:'/Model/ArticleAttribute',
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
              name:'MediasPortlet',
              props: {
                elevation: 6,
                cols:3,
                field:'medias',
                marginTop:2,  
               },
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
      modelName:'/Model/Article',
    },      
  },

  
}
