export const  OneToManyTableView = {
  layout:[{
    name: 'GridRow',
    props: {
      justify: 'space-between',
      alignItems: "center",
      spacing: 2,
      marginTop:2,
    },
    children: [{
        name: 'GridColumn',
        children: [{
          name: 'h2',
          props:{
            rxText: '1对多表格',            
          }
        }],
      },
      {
        name: 'GridColumn',
        children: []
      },
    ]
  },
  {
      name: 'GridRow',
      props: {
        spacing: 2,
      },
  
      children: [{
          name: 'GridColumn',
          props: {
            xs: 12,
          },
          children: [
            {
              name:'OneToManyTable',
              withNode:true,
              field:'specsAndStocks',
              props: {
                elevation: 6,
                title:'规格库存',
                collapsible: true,
                marginTop:2,
                open:true,
                size:"small",
                field:'specs',
              },
              children:[
                {
                  name:'TableColumn',
                  props:{
                    label:'图片',                  
                  },
                  children:[{
                    name:'MediaSelect',
                    props:{
                      field:'image',
                      width:'60px',
                    }
                  }]
                },
                {
                  name:'TableColumn',
                  props:{
                    label:'名称',
                    width:'200px',
                  },
                  children:[{
                    name:'TextBox',
                    props:{
                      field:'name',
                      variant:'outlined',
                      size:'small',
                    }
                  }]
                },
                {
                  name:'TableColumn',
                  props:{
                    label:'颜色',
                  },
                  children:[{
                    name:'TextBox',
                    props:{
                      field:'color',
                      variant:'outlined',
                      size:'small',
                    }
                  }]
                },
                {
                  name:'TableColumn',
                  props:{
                    label:'型号',
                  },
                  children:[{
                    name:'SelectBox',
                    props:{
                      field:'category',
                      variant:"outlined",
                      size:'small',
                      withoutEmpertyItem:false,                        
                      items:[
                        {
                          slug:'100',
                          label:'100'
                        },
                        {
                          slug:'200',
                          label:'200'
                        },
                        {
                          slug:'300',
                          label:'300'
                        }
                      ]
                    }
                  }],
                },
                {
                  name:'TableColumn',
                  props:{
                    label:'库存',
                  },
                  children:[{
                    name:'TextBox',
                    props:{
                      field:'stock',
                      variant:'outlined',
                      size:'small',
                    }
                  }]
                },
          
          
              ]             
            }
            
          ]
        },
      ]
    }
  ],
}