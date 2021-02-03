import { GO_BACK_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";

export default [
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
              field:'name',
              props:{
                label:'名称',
                variant:"outlined",
                fullWidth:true,
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
              field:'description',
              props:{
                label:'描述',
                variant:"outlined",
                multiline:true,
                rows:3,
                fullWidth:true,
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
              field:'auths',
              props:{
                label:"权限",
                variant:"outlined",
                itemName:'name',
                multiple:true,
                fullWidth:true,
                query:'allRxAuths',
                groupByField:'group_name',
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
              field:'status',
              props:{
                label:'禁用',
                fullWidth:true,
                onValue:'FORBID',
                offValue:'NORMAL'
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
            name:SUBMIT_MUTATION,
            mutation:{
              name:'saveRxRole',
              variableName:'role',
              variableType:'RxRoleInput',
              submitNode:'',
              refreshNode:'',
              goback:true,
            },   
          }      
        }
      }]

    }
]
