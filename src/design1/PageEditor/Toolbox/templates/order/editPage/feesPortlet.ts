export default {
  name:'OneToManyTable',
  props: {
    elevation: 6,
    title:'订单费用',
    collapsible: true,
    marginTop:2,
    open:true,
    size:"small",
    field:'fees',
    columns:[
      {
        field:'payment_date',
        label:'付款日期',
        input:{
          name:'TextBox',
          props:{
            type:'date',
            variant:'outlined',
            size:'small',
          }
        }
      },
      {
        field:'name',
        label:'名称',

        input:{
          name:'TextBox',
          props:{
            variant:'outlined',
            size:'small',
          }
        }
      },
      {
        field:'currency',
        label:'币种',
        props:{
          width:'140px',
        },
        input:{
          name:'SelectBox',
          props:{
            variant:"outlined",
            fullWidth:true,
            size:'small',
            field:'currency',
            withoutEmpertyItem:true,
            items:[
              {
                slug:'dollor',
                label:'美元'
              },
              {
                slug:'euro',
                label:'欧元'
              },                              
              {
                slug:'rmb',
                label:'人民币'
              },

            ]
          }
        }
      },
      {
        field:'amount',
        label:'金额',

        input:{
          name:'TextBox',
          props:{
            type:'number',
            variant:'outlined',
            size:'small',
          }
        }
      },

      {
        field:'exchange',
        label:'汇率',

        input:{
          name:'TextBox',
          props:{
            type:'number',
            variant:'outlined',
            size:'small',
          }
        }
      },
      {
        field:'note',
        label:'备注',

        input:{
          name:'TextBox',
          props:{
            variant:'outlined',
            size:'small',
          }
        }
      },

    ]         
  },            
}