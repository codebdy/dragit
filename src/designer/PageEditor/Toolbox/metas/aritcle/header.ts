import { GO_BACK_ACTION } from "base/PageAction";

export default{
  name: 'GridRow',
  props: {
    justify: 'space-between',
    alignItems: "center",
    marginTop: 2,
    spacing: 2,
  },
  children: [{
      name: 'GridColumn',
      children: [
        {
          name: 'h2',
          props:{
            rxText: '文章编辑',            
          }
        }
      ],
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
}