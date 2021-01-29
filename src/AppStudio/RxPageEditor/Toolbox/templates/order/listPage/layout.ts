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
          {
            name: 'GridRow',
            props: {
              spacing: 2,
            },
        
            children: [{
                name: 'GridColumn',
                props: {
                  md: 12,
                },
                children: [
                  {
                    name:'div',
                    props:{
                      rxText:'列表显示区',
                    }
                  },
                ]
              },
            ]
          }
        ]
      }
  ]
}
