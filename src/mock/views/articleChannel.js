export default {
  withoutForm:true,
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
          props: {
            xs:10,
          },
          children: [          {
            name:'TreeEditor',
            props:{
              title:'文章频道',
              elevation:6,
              marginTop:4,
              bind:{
                method:'post',
                url:'/api/data/query-operate-models',
                params:{
                  modelName:'/Model/Article',
                },      
              },

            }
          }],
        }

      ]
    },
  ] 
}
