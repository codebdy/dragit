import { OPEN_PAGE_ACTION } from "Base/PageUtils/ACTIONs"
import listView from './list';
export var postTagListSchema = [
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
          marginTop:2,
      },
      children: [
        {
          name: 'GridColumn',
          props: {
            xs:8,
            container:true,
            justify: 'space-between',
            alignItems: "center",
          },
          children: [
            {
              name: 'GridColumn',
              children:[
                {
                  name: 'h2',
                  props:{
                    rxText: '标签列表',
                  }                    
                },
                
              ]
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
                  //size: "large",
                  onClick:{
                    name: OPEN_PAGE_ACTION,
                    page:{
                      moduleSlug:'article-tag',
                      pageSlug:'guid-p-cms-9',
                    }
                  }
                }
              }]
            },
  
          ],
        },

          {
            name: 'GridColumn',
            props: {
              xs:8,
            },
            children: [ listView ],
          }

      ]
    },
  ] 

