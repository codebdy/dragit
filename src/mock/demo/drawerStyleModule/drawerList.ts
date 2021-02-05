import { OPEN_PAGE_ACTION } from "Base/PageUtils/ACTIONs"
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
                    rxText: '用户列表',
                  }
                  
              }],
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
                onClick:{
                  name: OPEN_PAGE_ACTION,
                  pageJumper: {openStyle: "DRAWER", pageId: "guid-p-9"},
                }
              }
            }]
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

