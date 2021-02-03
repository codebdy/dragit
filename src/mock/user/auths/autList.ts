import list from "./list"

export default [
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
          marginTop: 2,
      },
      children: [
          {
              name: 'GridColumn',
              children: [{
                  name: 'h2',
                  props:{
                    rxText: '系统级权限列表',
                  }
                  
              }],
          },
          {
            name: 'GridColumn',
            props: {
              xs:12,
              marginTop: 1,
            },
            children: [list],
          }

      ]
    },
  ] 

