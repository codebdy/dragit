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
            md: 6,
          },
          children: [
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'角色编辑',
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
                            label:'名称',
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
                            label:'描述',
                            variant:"outlined",
                            fullWidth:true,
                            field:'description',
                            multiline:true,
                            rows:3,
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
                            label:"权限",
                            variant:"outlined",
                            field:'roleIds',
                            itemName:'name',
                            multiple:true,
                            fullWidth:true,
                            fromUrl:true,
                            method:'get',
                            url:'/api/data/list_model',
                            params:{
                              modelName:'/Model/Role',
                            }
                          },                         
                        }
                      ]
                    },
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
  closeAfterSubmit:true,
  api:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/User',
    },      
  },
}
