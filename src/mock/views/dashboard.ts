export default {
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
      },
      children: [
          {
              name: 'GridColumn',
              children: [{
                  name: 'h2',
                  props:{
                    rxText: '分析看板1',
                  }
                  
              }],
          },

      ]
    },
  ] 
}
