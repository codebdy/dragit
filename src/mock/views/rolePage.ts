import { GO_BACK_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";


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
                  name:'FormGridContainer',
                  props:{
                    spacing:2,
                  },
                  children:[
                    {
                      name: 'FormGridItem',
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
                      name: 'FormGridItem',
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
                      name: 'FormGridItem',
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
                      name: 'FormGridItem',
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
                            itemKey:"slug",
                            groupByField:"module",
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
                      size:'large',
                      marginLeft:2,
                      onClick:{
                        name: SUBMIT_MUTATION,
                      }          
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

}
