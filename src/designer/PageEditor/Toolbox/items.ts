
import article from './metas/aritcle/editPage';
import articleLayout from './metas/aritcle/editPage/layout';
import articleHeader from './metas/aritcle/editPage/header';
import articleBasePortlet from './metas/aritcle/editPage/basePortlet';
import articleSeoPortlet from './metas/aritcle/editPage/seoPortlet';
import articleContentPortLet from './metas/aritcle/editPage/contentPortlet';
import articleAppearancePortlet from './metas/aritcle/editPage/appearancePortlet';
import articleMedias from './metas/aritcle/editPage/mediasPortlet';
import artilceList from './metas/aritcle/listPage';
import articleListHeader from './metas/aritcle/listPage/header';
import articleListLayout from './metas/aritcle/listPage/layout';
import aritcleListList from './metas/aritcle/listPage/list';
import portlet from './metas/portlet'

export default [
  {
    titleKey: "template",
    children:[
      {
        titleKey:'article',
        children:[
          {
            title:'列表页',
            meta:artilceList,
            children:[
              {
                title:'栅格布局',
                meta:articleListLayout,
              },              
              {
                title:'页面标题',
                meta:articleListHeader,
              },
              {
                title:'列表控件',
                meta:aritcleListList,
              },
            ]        
          },
          {
            title:'编辑页',
            meta:article,
            children:[
              {
                title: '栅格布局',
                meta: articleLayout,
              },
              {
                title:'页面标题',
                meta: articleHeader,
              },
              {
                title:'基本信息',
                meta:articleBasePortlet,
              },
              {
                title:'SEO数据',
                meta:articleSeoPortlet,
              },
              {
                title:'内容',
                meta:articleContentPortLet,
              },
              {
                title:'显示',
                meta:articleAppearancePortlet,
              },
              {
                title:'媒体',
                meta:articleMedias,
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
        titleKey:'row',
        meta:{name:'GridRow'},
      },
      {
        titleKey:"column",
        meta:{name:'GridColumn'},
      },  
      {
        titleKey:"page-title",
        meta:{
          name:"h2",
          props:{
            rxText:'Page title',
          }
        }
      },      
    ]
  },
  {
    titleKey: "cards",
    children:[
      {
        titleKey:"portlet",
        meta:portlet,
        children:[
          {
            titleKey:"portlet-body",
            meta: {
              name:'PortletGridContainer',
            }
          },
          {
            titleKey:'portlet-grid-item',
            meta:{
              name:'PortletGridItem',
            }
          },
          {
            titleKey:"portlet-footer",
            meta:{
              name:'PortletFooter',
            }
          },          
        ]     
      },  

      {
        titleKey:"medias-portlet",
        meta:{
          name:'MediasPortlet',
          props: {
            elevation: 6,
          },
        }
      },

      {
        titleKey:"one-to-one-portlet",
        meta: {
          name:'OneToOnePortlet',
          props: {
            elevation: 6,
            open:true,
            withHeader:true,
            title:'One to One Portlet',
            collapsible: true,
          },
          children:[
            {
              name:'PortletGridContainer',
            }
          ]
        }
      },

      {
        titleKey:"one-to-many-portlet",
        meta: {
          name:'OneToManyPortlet',
          props: {
            elevation: 6,
            open:true,
            withHeader:true,
            title:'One to Many Portlet',
            collapsible: true,
          },
          children:[
            {
              name:'PortletGridContainer',
            }
          ]
        }
      },

      {
        titleKey:"one-to-many-table",
        meta: {
          name:'OneToManyTable',
          props: {
            elevation: 6,
            open:true,
            withHeader:true,
            title:'One to Many Table',
            collapsible: true,
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