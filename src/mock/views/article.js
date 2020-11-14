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
    name: 'GridRow',
    props: {
      justify: 'space-between',
      alignItems: "center",
    },
    children: [{
        name: 'GridColumn',
        children: [{
          name: 'h2',
          props:{
            rxText: '文章编辑',            
          }

        }],
      },
      {
        name: 'GridColumn',
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
      name: 'GridRow',
      props: {
        spacing: 3,
      },
  
      children: [{
          name: 'GridColumn',
          props: {
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
                        rule:{
                          valueType:'string',
                          required:true,
                        }                      
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
                        //required:true,
                        xs:12,                      
                        rule:{
                          //valueType:'string',
                          //required:true,
                        }                      
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
                        helperText:'作者提示'
                      }
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'TextField',
                        label:'Email',
                        variant:"outlined",
                        //size:"small",
                        //select: true,
                        field:'email',
                        rule:{
                          valueType:'string',
                          ruleType:'email',
                          required:true,
                        },
                        xs:6,
                      }
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'SelectBox',
                        label:"分类",
                        variant:"outlined",
                        //size:"small",
                        field:'category',
                        xs:6,
                        required:true,
                        helperText:'请选择分类',
                        multiple:true,
                        rule:{
                          required:true,
                        },
                        data:{
                          fromUrl:false,           
                          items:[
                            {
                              slug:'news',
                              label:'新闻',
                            },
                            {
                              slug:'tech',
                              label:'技术',
                            },
                            {
                              slug:'jingyan‘',
                              label:'经验',
                            },
                          ]
                        }           
                      }
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'SelectBox',
                        label:"频道",
                        variant:"outlined",
                        field:'channel',
                        xs:6,
                        required:true,
                        withoutEmpertyItem:true,                        
                        data:{
                          fromUrl:true,
                          url:'/api/base/items',
                        },

                        rule:{
                          required:true,
                        },
                      },        
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
                      name: 'FormGridItem',
                      props:{
                        as:'Combobox',
                        label:"标签",
                        variant:"outlined",
                        field:'tags',
                        multiple:false,
                        xs:12,
                        //required:true,
                        data:{
                          fromUrl:false,           
                          items:[
                            {
                              slug:'product',
                              label:'产品',
                            },
                            {
                              slug: 'iPhone',
                              label:'iPhone',
                            },
                            {
                              slug:'apple',
                              label:'苹果',
                            },
                          ]
                        },           

                        rule:{
                          //required:true,
                        },
                      },        
                    },
                    {
                      name: 'FormGridItem',
                      props:{
                        as:'Combobox',
                        label:"标签2",
                        variant:"outlined",
                        field:'tags2',
                        multiple:true,
                        xs:12,
                        //required:true,
                        data:{
                          fromUrl:true,
                          url:'/api/base/items',
                        },

                        rule:{
                          required:true,
                        },
                      },        
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
              name:'OneToManyTable',
              props: {
                elevation: 6,
                title:'规格库存',
                collapsible: true,
                spacingTop:2,
                open:true,
                size:"small",
                field:'specs',
                columns:[
                  {
                    field:'image',
                    label:'图片',
                    input:{
                      name:'MediaSelect',
                      props:{
                        width:'60px',
                      }
                    }
                  },
                  {
                    field:'name',
                    label:'名称',
                    props:{
                      width:'200px',
                    },

                    input:{
                      name:'TextField',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'color',
                    label:'颜色',
                    input:{
                      name:'TextField',
                      props:{
                        variant:'outlined',
                        size:'small',
                      }
                    }
                  },
                  {
                    field:'category',
                    label:'分类',
                    input:{
                      name:'SelectBox',
                      props:{
                        variant:"outlined",
                        size:'small',
                        withoutEmpertyItem:false,                        
                        data:{
                          fromUrl:true,
                          url:'/api/base/items',
                        },
                      }
                    },        
                  },


                ]         
              },            
            },
          ]
        },
        {
          name: 'GridColumn',
          props: {
            md: 4,
          },
          children: [
            {
              name:'Portlet',
              props: {
                elevation: 6,
                open:true,
                withHeader:true,
                title:'显示',
                collapsible: true,
              },
              children:[
                {
                  name:"PortletFormGridBody",
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  settings:{
    isFormPage:true,
    api:'',
  }
  
}
