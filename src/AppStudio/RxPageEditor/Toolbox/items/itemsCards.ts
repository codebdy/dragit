import listView from "../listView";
import listViewToolbar from "../listView/listViewToolbar";
import portlet from "../portlet";

export default{
  titleKey: "cards",
  children:[
    {
      titleKey:"portlet",
      meta:portlet,
      children:[
        {
          titleKey:"form-grid-container",
          meta: {
            name:'FormGridContainer',
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
      titleKey:"list-view",
      meta:listView,
      children:[
        {
          titleKey:"list-view-toolbar",
          meta:listViewToolbar,
          children:[
            {
              titleKey:'list-view-filters',
              meta:{
                name:'ListViewToolbar'
              },
              children:[
                {
                  titleKey:'keywords-filter',
                  meta:{
                    name:'ListViewKeywordFilter'
                  },
                },
                {
                  titleKey:'enum-filter',
                  meta:{
                    name:'ListViewEnumFilter'
                  },
                },
              ]
            },
            {
              titleKey:'list-view-batch-actions',
              meta:{
                name:'ListViewBatchActions'
              }
            },
          ]            
        },
        {
          titleKey:'list-view-body',
          meta:{
            name:'ListViewBody'
          },
          children:[
            {
              titleKey:'table-column',
              meta:{
                name:'TableColumn'
              }
            }
          ]
        },
        {
          titleKey:'list-view-pagination',
          meta:{
            name:'ListViewPagination',
            props:{
              rowsPerPageOptions: '5, 10, 25, 50, 100'
            }
          }
        }

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
        name:'Portlet',
        props: {
          elevation: 6,
          open:true,
          withHeader:true,
          title:'One to One Portlet',
          collapsible: true,
        },
        children:[
          {
            name:'FormGridContainer',
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
            name:'FormGridContainer',
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
    {
      titleKey:"tree-edit-portlet",
      meta: {
        name:'TreeEditor',
        props: {
          elevation: 6,
          title:'Tree edit card',
        },
      }
    },

  ]
}