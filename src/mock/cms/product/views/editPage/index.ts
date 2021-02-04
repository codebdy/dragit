import appearancePortlet from "./appearancePortlet"
import basePortlet from "./basePortlet"
import contentPortlet from "./contentPortlet"
import header from "./header"
import mediasPortlet from "./mediasPortlet"
import seoPortlet from "./seoPortlet"

export var productEditSchema =[ {
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
                  md: 8,
                },
                children: [
                  mediasPortlet,
                  basePortlet,
                  
                  contentPortlet,
                ]
              },
              {
                name: 'GridColumn',
                props: {
                  md: 4,
                },
                children: [
                  appearancePortlet,
                  seoPortlet,
                ]
              }
            ]
          }
        ]
      }
  ]
}]
