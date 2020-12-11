import {GO_BACK_ACTION} from "base/PageAction";
import {API_GET_MODEL_BY_ID, API_LIST_MODEL, API_SUBMIT_MODEL} from "APIs/model"

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
            md: 6,
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
                  name:'FormGridContainer',
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
                            label:'登录名',
                            variant:"outlined",
                            fullWidth:true,
                            required:true,
                            field:'login_name',
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
                            label:'姓名',
                            variant:"outlined",
                            fullWidth:true,
                            field:'name',
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
                          name:'TextBox',
                          props:{
                            label:'密码',
                            variant:"outlined",
                            type:'password',
                            fullWidth:true,
                            field:'password',
                            placeholder:'保持为空表示不修改',
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
                          name:'TextBox',
                          props:{
                            label:'Email',
                            variant:"outlined",
                            fullWidth:true,
                            field:'email',
                            empertyValue:'',
                            rule:{
                              valueType:'string',
                              ruleType:'email',
                            },
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
                          name:'MultiSelectBox',
                          props:{
                            label:"角色",
                            variant:"outlined",
                            field:'roleIds',
                            itemName:'name',
                            multiple:true,
                            fullWidth:true,
                            dataApi:{
                              ...API_LIST_MODEL,
                              params:{
                                modelName:'/Model/Role',
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
                            label:'禁用',
                            fullWidth:true,
                            field:'forbid',
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
                          name:'MediaSelect',
                          props:{
                            field:'avatar',
                            width:'120px',
                            label:'头像',
                            avatar:true,
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
  getApi:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/User',
    },      
  },

  submitApi:{
    ...API_SUBMIT_MODEL,
    params:{
      modelName:'/Model/User',
    },      
  }
}
