import {GO_BACK_ACTION} from "admin/views/Page/PageAction";

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
          props:{
            rxText: '文章编辑',            
          }

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
            props: {
              variant: "outlined",
              rxText: '取消',
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
          props: {
            rxText: '保存',
            variant: "contained",
            color: "primary",
            type: "submit",
            //size: "large",
            style: {
              fontSize: '1.1rem',
            },
            //onClick:{
            //  name: POST_DATA_ACTION,
            //  slug:'save',
            //  needGoBack:true,
            //}            
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
              name:'MediasPortlet',
              props: {
                elevation: 6,
                //cols:3,
                field:'medias',
                //spacingTop:2,  
               },
            },
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'基本信息',
                collapsible: true,
                spacingTop:2,              
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
                    {
                      name:"FormGridItem",
                      props:{
                        as:'TextField',
                        fullWidth: true,
                        label:'简介',
                        variant:"outlined",
                        //size:"small",
                        multiline:true,
                        rows:5,
                        xs:12,
                      }

                    }
                    
                  ]
                },
                {
                  name:'PortletFooter',
                  text:'Footer',
                }
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
            
          ]
        }
      ]
  
  }
  ],

  fields:[
    {
      name:'title',
      rule:{
        valueType:'string',
        required:true,
      }
    },
    {
      name:'name',
    },
    {
      name:'slug',
      rule:{
        valueType:'string',
        required:true,
      }
    },
  ]
  
}
