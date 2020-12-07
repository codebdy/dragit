import {GO_BACK_ACTION} from "base/PageAction";
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
                title:'通知查看',
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
                            readOnly:true,
                            field:'title',
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
                            label:'时间',
                            variant:"outlined",
                            fullWidth:true,
                            readOnly:true,
                            field:'created_at',
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
                            label:'内容',
                            variant:"outlined",
                            fullWidth:true,
                            field:'content',
                            multiline:true,
                            readOnly:true,
                            rows:10,
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
                        variant: "contained",
                        rxText: '返回',
                        color: "primary",
                        size:'large',
                        onClick:{
                          name: GO_BACK_ACTION,
                          careDuty: true, //如果有修改，显示保存提示
                        }
                      }
                    },

                  ]
          
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
      modelName:'/Model/Notification',
    },      
  },
}
