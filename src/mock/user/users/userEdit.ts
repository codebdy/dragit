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
              field:'login_name',
              props:{
                label:'登录名',
                variant:"outlined",
                fullWidth:true,
                required:true,
                rule:{
                  valueType:'string',
                  required:true,
                }                      
              }
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
              field:'name',
              props:{
                label:'姓名',
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
              field:'password',
              props:{
                label:'密码',
                variant:"outlined",
                type:'password',
                fullWidth:true,
                placeholder:'保持为空表示不修改',
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
              field:'email',
              props:{
                label:'Email',
                variant:"outlined",
                fullWidth:true,
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
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'MultiSelectBox',
              field:'roles',
              props:{
                label:"角色",
                variant:"outlined",
                itemName:'name',
                multiple:true,
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
              name:'SwitchBox',
              field:'status',
              props:{
                label:'禁用',
                fullWidth:true,
              },
            }
          ]
        },
        {
          name:"FormGridItem",
          props:{
            xs:12,
          },
          children:[
            {
              name:'MediaSelect',
              field:'avatar',
              props:{
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
          size:'large',
          marginLeft:2,
          onClick:{
            name:SUBMIT_MUTATION,
            mutation:{
              name:'saveRxUser',
              variableName:'user',
              variableType:'RxUserInput',
              submitNode:'',
              refreshNode:'',
              goback:true,
            },   
          }      
        }
      }]

    }
]
