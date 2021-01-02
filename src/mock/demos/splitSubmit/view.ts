import {RESET_ACTION, SUBMIT_MUTATION} from "base/PageAction";

export default {
  layout:[
    {
      name: 'GridRow',
      props: {
        marginTop: 2,
        spacing: 2,
      },
      children: [
        {
          name: 'GridColumn',
          props:{
            xs:6,
          },
          children: [
            {
              name:'Portlet',
              props: {
                variant:'outlined',
                open:true,
                withHeader:true,
                title:'减法计算器',
                collapsible: false,
              },
              children:[
                {
                  name:"FormGridContainer",
                  props:{
                    field:'subtraction',
                  },
                  children:[
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'Typography',
                          props:{
                            variant:'subtitle1',
                            rxText: '做减法很难，需要后端大哥帮忙',            
                          }
                        }
                      ]
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'被减数',
                            variant:"outlined",
                            fullWidth:true,
                            field:'minute',
                            type:'number',
                            required:true,
                            rule:{
                              valueType:'number',
                              required:true,
                            }
                          }
                        }
                      ]
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:6,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'减数',
                            variant:"outlined",
                            fullWidth:true,
                            field:'minus',
                            type:'number',
                            required:true,
                            rule:{
                              valueType:'number',
                              required:true,
                            }
                          }
                        }
                      ]
                    },

                  ]
                },
                {
                  name:"FormGridContainer",
                  children:[
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'计算结果',
                            variant:"outlined",
                            fullWidth:true,
                            field:'subtractResult',
                            onlyShow:true,
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  name:'PortletFooter',
                  children: [
                    {
                      name: 'Button',
                      props: {
                        variant: "outlined",
                        rxText: '重置',
                        size:'large',
                        onClick:{
                          name: RESET_ACTION,
                          resetNodes:['subtraction','subtractResult'],
                        }
                      }
                    },
                    {
                    name: 'Button',
                    props: {
                      rxText: '计算',
                      variant: "contained",
                      color: "primary",
                      size:'large',
                      marginLeft:2,
                      onClick:{
                        name: SUBMIT_MUTATION,
                        mutation:{
                          name:'subtract',
                          variableName:'params',
                          variableType:'SubtractionInput',
                          submitNode:'subtraction',
                          refreshNode:'subtractResult',
                          //goback:true,
                        },
                      }           
                    }
                  }]
            
                }
              ]
            },
          ],
        },
        {
          name: 'GridColumn',
          props:{
            xs:6,
          },
          children: [
            {
              name:'Portlet',
              props: {
                variant:'outlined',
                open:true,
                withHeader:true,
                title:'复利计算器',
                collapsible: false,
                
              },
              children:[
                {
                  name:"FormGridContainer",
                    props: {
                      field:'compound',
                    },                  
                    children:[
                    {
                      name: 'PortletGridItem',

                      props:{
                        xs:12,
                      },
                      children:[
                        {
                          name:'Typography',
                          props:{
                            variant:'subtitle1',
                            rxText: '见证世界第八大奇迹',            
                          }
                        }
                      ]
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:4,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'基数',
                            variant:"outlined",
                            fullWidth:true,
                            field:'cardinal',
                            type:'number',
                            rule:{
                              valueType:'number',
                              required:true,
                            }
                          }
                        }
                      ]
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:4,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'利率',
                            variant:"outlined",
                            fullWidth:true,
                            field:'rate',
                            type:'number',
                            rule:{
                              valueType:'number',
                              required:true,
                            }
                          }
                        }
                      ]
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:4,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'期数',
                            variant:"outlined",
                            fullWidth:true,
                            field:'periods',
                            type:'number',
                            rule:{
                              valueType:'number',
                              required:true,
                            }
                          }
                        }
                      ]
                    },
                    {
                      name: 'PortletGridItem',
                      props:{
                        xs:12,
                        marginTop:2,
                      },
                      children:[
                        {
                          name:'TextBox',
                          props:{
                            label:'计算结果',
                            variant:"outlined",
                            fullWidth:true,
                            field:'result',
                            onlyShow:true,//不是输入字段
                          }
                        }
                      ]
                    },
                  ]
                },
                {
                  name:'PortletFooter',
                  children: [
                    {
                      name: 'Button',
                      props: {
                        variant: "outlined",
                        rxText: '重置',
                        size:'large',
                        onClick:{
                          name: RESET_ACTION,
                          resetNode:['compound'],
                        }
                      }
                    },
                    {
                    name: 'Button',
                    props: {
                      rxText: '计算',
                      variant: "contained",
                      color: "primary",
                      size:'large',
                      marginLeft:2,
                      onClick:{
                        name: SUBMIT_MUTATION,
                        mutation:{
                          name:'compound',
                          variableName:'params',
                          variableType:'CompoundInput',
                          submitNode:'compound',
                          refreshNode:'compound',
                        },

                      }           
                    }
                  }]
            
                }
              ]
            },
          ],
        },

      ]
    },
    
],
}
