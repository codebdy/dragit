
import header from "./header"
import list from "./list"

export var productListSchema = [{
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
          header,
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
                  list,
                ]
              },
            ]
          }
        ]
      }
  ]
}]
