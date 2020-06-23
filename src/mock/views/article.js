import {GO_BACK_ACTION} from "admin/views/Page/FormAction";

export default {
  initAction:{
      method:'get',
      url:'/api/data/article',
      data:{
        modelName:'/RXDrag/Model/Article',
      },      
  },

  layout:[{
    name: 'Grid',
    props: {
      container: true,
      justify: 'space-between',
      alignItems: "center",
    },
    children: [{
        name: 'Grid',
        props: {
          item: true,
        },
        children: [{
          name: 'h2',
          text: '文章编辑',
        }],
      },
      {
        name: 'Grid',
        //text: 'test',
        props: {
          item: true,
        },
        children: [
          {
            name: 'Button',
            text: '取消',
            props: {
              variant: "outlined",
              style: {
                fontSize: '1.1rem',
                marginRight: '8px',
              },
              onClick:{
                name: GO_BACK_ACTION,
                careDuty: true, //如果有修改，显示保存提示
              }
            }
          },
          {
          name: 'Button',
          text: '保存',
          props: {
            variant: "contained",
            color: "primary",
            type: "submit",
            //size: "large",
            style: {
              fontSize: '1.1rem',
            }
          }
        }]
      },
    ]
  },
  {
      name: 'Grid',
      props: {
        container: true,
        spacing: 3,
      },
  
      children: [{
          name: 'Grid',
          props: {
            item: true,
            md: 8,
          },
          children: [
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'基本信息',
                scalable: true,
              },
              children:[
                {
                  name:'PortletFormGridBody',
                  children:[
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'TextField',
                        label:'标题',
                        variant:"outlined",
                        field:'title',
                        xs:12,
                      }
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'TextField',
                        label:'Slug',
                        variant:"outlined",
                        //size:"small",
                        field:'slug',
                        xs:12,                      
                      }
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'TextField',
                        label:'作者',
                        variant:"outlined",
                        //size:"small",
                        //select: true,
                        field:'auther',
                        xs:6,
                      }
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'TextField',
                        label:"创作日期",
                        variant:"outlined",
                        //size:"small",
                        type:'date',
                        InputLabelProps:{
                          shrink: true,
                        },
                        field:'create_date',
                        xs:6,
                      }
                    },
                  ]
                },
                {
                  name:'PortletFooter',
                  text:'Footer',
                }
              ]
            },
            {
              name:'Portlet',
              props: {
                elevation: 6,
                //open:true,
                withHeader:true,
                title:'基本信息2',
                scalable: false,
                style:{
                  marginTop:'16px',
                },              
              }
            },
            {
              name: 'Card',
              props: {
                elevation: 6,
                style:{
                  marginTop:'16px',
                },              
              },
              children: [{
                  name: 'CardHeader',
                  props: {
                    title: '基本信息',
                  }
  
                },
                {
                  name: 'Divider'
                },
                {
                  name: 'CardContent',
                  children:[
                    {
                      name:'Grid',
                      props:{
                        container:true,
                        spacing:2,
                      },
                      children:[
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:'标题',
                                variant:"outlined",
                                field:'title',
                                //size:"small",
                              }
                            },
                          ]
                        },
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:'Slug',
                                variant:"outlined",
                                //size:"small",
                                field:'slug',
                              }
                            },
                          ]
                        },
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                            md:6,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:'作者',
                                variant:"outlined",
                                //size:"small",
                                //select: true,
                                field:'auther',
                              }
                            },
                          ]
                        },
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                            md:6,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:"创作日期",
                                variant:"outlined",
                                //size:"small",
                                type:'date',
                                InputLabelProps:{
                                  shrink: true,
                                },
                                field:'create_date',
                              }
                            },
                          ]
                        },
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                            md:6,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:"来源",
                                variant:"outlined",
                                //size:"small",
                              }
                            },
                          ]
                        },
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                            md:6,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:"来源网址",
                                variant:"outlined",
                                //size:"small",
                              }
                            },
                          ]
                        },
                        {
                          name:'Grid',
                          props:{
                            item:true,
                            xs:12,
                          },
                          children:[
                            {
                              name:"FormField",
                              props:{
                                as:'TextField',
                                fullWidth: true,
                                label:'简介',
                                variant:"outlined",
                                //size:"small",
                                multiline:true,
                                rows:5,
                              }
                            },
                          ]
                        },
                      ]
                    }
                  ]
                },
              ]
            },
            {
              name: 'Card',
              props: {
                elevation: 6,
                style:{
                  marginTop:'16px',
                },
               },
               children: [
                {
                  name: 'CardHeader',
                  props: {
                    title: 'SEO Meta',
                  }
  
                },
              ],
            },
            {
              name: 'Card',
              props: {
                elevation: 6,
                style:{
                  marginTop:'16px',
                },
               },
               children: [
                {
                  name: 'CardHeader',
                  props: {
                    title: '内容',
                  }
  
                },
              ],
            },
          ]
        },
        {
          name: 'Grid',
          props: {
            item: true,
            md: 4,
          },
          children: [
            {
              name: 'Card',
              props: {
                elevation: 6,
               },
               children: [
                {
                  name: 'CardHeader',
                  props: {
                    title: '显示',
                  }
  
                },
              ],
            },
            
          ]
        }
      ]
  
  }
  ]
  
}
