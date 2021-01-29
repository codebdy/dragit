export default {
  name: 'GridRow',
  props: {
  },
  children: [
    {
      name: 'GridColumn',
      props: {
        xs: 12,
      },
      children:[
        {
          name:'div',
          props:{
            rxText:'页面标题区',
          }
        },
      ]
    },
    {
      name: 'GridColumn',
      props: {
        xs: 12,
      },
      children:[
        {
          name:'div',
          props:{
            rxText:'编辑区',
          }
        },
      ]
    },
    {
      name: 'GridColumn',
      props: {
        xs: 12,
      },
      children:[
        {
          name:'div',
          props:{
            rxText:'页脚区',
          }
        },
      ]
    },
  ]
}
