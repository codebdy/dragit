import {GO_BACK_ACTION} from "admin/views/Page/PageAction";
import {API_GET_MODEL_BY_ID} from "APIs/model"

export default {
  layout:[
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
                title:'用户编辑',
                //collapsible: true,
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
                      ],
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:6,
                      },
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
                           
                              fromUrl:false,           
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
                            
                              fromUrl:true,
                              url:'/api/base/items',

                            rule:{
                              required:true,
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
          
                }
              ]
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
      modelName:'/Model/User',
    },      
  },

  
}
