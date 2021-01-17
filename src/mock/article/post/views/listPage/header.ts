import { OPEN_PAGE_ACTION } from "Base/Action/ACTIONs";

export default{
  name: 'GridRow',
  props: {
    justify: 'space-between',
    alignItems: "center",
    spacing: 2,
    marginTop: 2,
  },
  children: [{
      name: 'GridColumn',
      children: [
        {
          name: 'Typography',
          props:{
            variant:'h5',
            rxText: '文章列表',            
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
          variant: "contained",
          color: "primary",
          rxText: '新建',
          size: "large",
          onClick:{
            name: OPEN_PAGE_ACTION,
            page:{
              pageId:'1012',              
            }

          }
        }
      }]
    },
  ]
}