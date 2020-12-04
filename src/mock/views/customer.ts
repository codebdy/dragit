import {GO_BACK_ACTION} from "admin/views/Page/PageAction";
import {API_GET_MODEL_BY_ID} from "APIs/model"

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
            rxText: '客户编辑',            
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
                        md:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'名称',
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
                            label:'简称',
                            variant:"outlined",
                            fullWidth:true,
                            field:'short_name',
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
                            label:'国家',
                            variant:"outlined",
                            fullWidth:true,
                            field:'country',
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
                      name:"PortletGridItem",
                      props:{
                        xs:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            fullWidth: true,
                            label:'收获地址',
                            variant:"outlined",
                            size:"small",
                            multiline:true,
                            rows:5,
                            field:'cargo_address',
                          }                        
                        }
                      ]
                    },
                    {
                      name:"PortletGridItem",
                      props:{
                        xs:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            fullWidth: true,
                            label:'快递地址',
                            variant:"outlined",
                            size:"small",
                            multiline:true,
                            rows:5,
                            field:'express_address',
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
                    field:'linkedin',
                    label:'领英',
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


  isFormPage:true,
  api:{
    ...API_GET_MODEL_BY_ID,
    params:{
      modelName:'/Model/Customer',
    },      
  },

  
}
