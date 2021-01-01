import { SUBMIT_MUTATION } from "base/PageAction";

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
        children: [
          {
          name: 'Button',
          props: {
            rxText: '保存',
            variant: "contained",
            color: "primary",
            size:'large',
            marginLeft:2,
            onClick:{
              name:SUBMIT_MUTATION,
            }
          }
        }]
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
              props: {
                elevation: 6,
                title:'联系人',
                collapsible: true,
                marginTop:2,
                open:true,
                size:"small",
                field:'contacts',
                columns:[
                  {
                    field:'name',
                    label:'姓名',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'emial',
                    label:'邮箱',

                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'tel',
                    label:'电话',
                    input:{
                      name:'TextBox',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'linkedin',
                    label:'领英',
                    input:{
                      name:'TextBox',
                      props:{
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
            },

          ]
        },
      ]
    }
  ],
}