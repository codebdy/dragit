import { GO_BACK_ACTION, SUBMIT_MUTATION } from "Base/PageUtlis/ACTIONs";

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
          name: 'Typography',
          props:{
            variant:'h5',
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
            rxText: '返回',
            size:'large',
            onClick:{
              name: GO_BACK_ACTION,
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
              name:'savePost',
              variableName:'post',
              variableType:'PostInput',
              submitNode:'',
              refreshNode:'',
              goback:true,
            },
          }
        }
      }]
    },
  ]
}