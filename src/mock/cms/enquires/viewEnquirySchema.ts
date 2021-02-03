import { GO_BACK_ACTION } from "Base/PageUtils/ACTIONs";

export const viewEnquirySchema = [
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
            name:'Hidden',
            field:'already_read',
          },
          {
            name:'TextBox',
            field:'name',
            props:{
              label:'姓名',
              variant:"outlined",
              fullWidth:true,
              readOnly:true,
            },
          },
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
              label:'邮箱',
              variant:"outlined",
              fullWidth:true,
              readOnly:true,
            },
          },
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
            field:'company',
            props:{
              label:'公司',
              variant:"outlined",
              fullWidth:true,
              readOnly:true,
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
            field:'created_at',
            props:{
              label:'时间',
              variant:"outlined",
              fullWidth:true,
              readOnly:true,
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
            field:'content',
            props:{
              label:'内容',
              variant:"outlined",
              fullWidth:true,
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