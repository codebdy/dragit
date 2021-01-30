import header from "./header";
import supplierPortlet from "./supplierPortlet";

export const  OneToManyPortletView = [
    {
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
          ]
        },
        {
          name: 'GridColumn',
          props: {
            xs: 12,
          },
          children:[
            supplierPortlet,
          ]
        },
      ]
    }
    
  ]