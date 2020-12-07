export default [
  {
    titleKey: "template",
    children:[
      {
        titleKey:'article',
        children:[
          {
            title:'文章列表页',
            metas:[],
            children:[
              {
                titleKey:'grid',
                metas:[],
              },              
              {
                title:'页面标题',
                metas:[],
              },
              {
                title:'列表控件',
                metas:[],
              },
            ]        
          },
          {
            title:'文章编辑页',
            metas:[],
            children:[
              {
                titleKey:'grid',
                metas:[],
              },
              {
                title:'页面标题',
                metas:[],
              },
              {
                title:'基本信息',
                metas:[],
              },
              {
                title:'基本信息',
                metas:[],
              },
              {
                title:'SEO数据',
                metas:[],
              },
              {
                title:'内容',
                metas:[],
              },
              {
                title:'显示',
                metas:[],
              },
              {
                title:'媒体',
                metas:[],
              },

            ]            
          },
        ]
      }
    ]
  },
  {
    titleKey: "layout",
    children:[
      {
        titleKey:"row",
        meta:{
          name:"Grid",
          props:{
            container:true,
          },
        }
      },  
      {
        titleKey:"column",
        meta:{
          name:"Grid",
          props:{
            item:true,
            xs:12,
            md:true,
          },
        }
      },  
  
    ]
  },
  {
    titleKey: "page",
    children:[
      {
        titleKey:"page-title",
        meta:{
          name:"h2",
          props:{
            rxText:'Page title',
          }
        }
      },  
      {
        titleKey:"portlet",
        meta:      {
          name:'Portlet',
          props: {
            elevation: 6,
            open:true,
            withHeader:true,
            title:'Portlet',
            collapsible: true,
            marginTop:2,              
          },
          children:[
            {
              name:'PortletFormGridBody',
            },
            {
              name:'PortletFooter',
              text:'Footer',
            }
          ]
        },
      },  
      {
        titleKey:"portlet-body",
        meta:      {
          name:'PortletFormGridBody',
        }
      },
      {
        titleKey:"portlet-footer",
        meta:      {
          name:'PortletFooter',
        }
      },
      {
        titleKey:"medias-portlet",
        meta:      {
          name:'MediasPortlet',
          props: {
            elevation: 6,
            //marginTop:2,              
          },
        }
      },
    ]
  },
  {
    titleKey: "form",
    children:[
      {
        titleKey:"text-field",
        meta:{
          name:"FormGridItem",
          props:{
            as:"TextField",
            label:"TextField",
            variant:"outlined",
          }
        }
      },
      {
        titleKey:"date",
        meta:{
          name: 'FormGridItem',
          props:{
            as:'TextField',
            label:"Date",
            variant:"outlined",
            type:'date',
            InputLabelProps:{
              shrink: true,
            },
            xs:6,
          }
        },
      },
      {
        titleKey:"selectbox",
        meta:{
          name: 'FormGridItem',
          props:{
            as:'SelectBox',
            label:"Select",
            variant:"outlined",
            xs:6,
            data:{
            }          
          }
        },
      },
      {
        titleKey:"combobox",
        meta:{
          name: 'FormGridItem',
          props:{
            as:'Combobox',
            label:"Combobox",
            variant:"outlined",
            xs:6,
            data:{
            }
          }
        },
      },
      {
        titleKey:"button",
        meta:{
          name:"Button",          
          props:{
            variant:"contained",
            rxText: "Button",
          }
        }
      }, 
      {
        titleKey:"typography",
        meta:{
          name:"Typography",
          props:{
            variant:"inherit",
            rxText: "Typography",
          }
        }
      }, 
    ]
  },

  {
    titleKey: "relations",
  },
  {
    titleKey: "customized",
  },
]