import listView from './list'

export var enquiryListSchema = [
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
                    rxText: '询盘列表',
                  }
                  
              }],
          },
          {
            name: 'GridColumn',
            props: {
              xs:12,
            },
            children: [          
              listView,
            ],
          }

      ]
    },
  ] 
