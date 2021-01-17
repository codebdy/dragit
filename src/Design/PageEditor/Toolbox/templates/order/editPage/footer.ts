import { GO_BACK_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";

export default {
  name: 'GridRow',
  props: {
    justify: 'flex-end',
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2,
    spacing: 2,
  },
  children: [
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
          }
        }
      }]
    },
  ]
}