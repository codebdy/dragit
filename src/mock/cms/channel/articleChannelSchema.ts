export default [
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
          children: [          
            {
              name:'TreeEditor',
              props:{
                title:'文章频道',
                elevation:6,
                marginTop:4,
                query:'postChannelTree',
                mutation:'savePostChannelTree',
              },
              children:[
                {
                  name:"FormGridContainer",
                  props:{
                    spacing:2,
                  },
                  children:[
                    {
                      name: 'FormGridItem',
                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'TextBox',
                          field:'name',
                          props:{
                            label:'名称',
                            variant:"outlined",
                            fullWidth:true,
                          }
                        }
                      ]
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'TextBox',
                          field:'rx_slug',
                          props:{
                            label:'Slug',
                            variant:"outlined",
                            fullWidth:true,
                          }
                        }
                      ]
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        xs:12,                      
                      },
                      children:[
                        {
                          name:'TextBox',
                          field:'description',
                          props:{
                            label:'描述',
                            variant:"outlined",
                            fullWidth:true,
                            multiline:true,
                            rows:5,
                          },
                        }
                      ]
                    },
                  ]
                }
              ]
            }
          ],
        }
      ]
    },
  ] 
