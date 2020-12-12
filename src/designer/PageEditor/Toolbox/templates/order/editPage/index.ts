import header from "./header"
import customerPortlet from "./customerPortlet"
import supplierPortlet from "./supplierPortlet"
import feesPortlet from "./feesPortlet"
import calcPortlet from "./calcPortlet"
import footer from "./footer"


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
        header,
      ]
    },
    {
      name: 'GridColumn',
      props: {
        xs: 12,
      },
      children:[
        customerPortlet,
        supplierPortlet,
        feesPortlet,
        calcPortlet,
      ]
    },
    {
      name: 'GridColumn',
      props: {
        xs: 12,
      },
      children:[
        footer
      ]
    },
  ]
}
