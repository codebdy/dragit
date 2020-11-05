export default [
  {
    id:"1",
    titleKey: "layout",
    icon:"mdi-view-dashboard",
    children:[
      //{
      //  id:"1-1",
      //  titleKey:"page-container",
      //  meta:{
      //    name:"Container",
      //  }
      //},  
      {
        id:"1-2",
        titleKey:"row",
        meta:{
          name:"Grid",
          props:{
            container:true,
          },
        }
      },  
      {
        id:"1-3",
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
    id:"2",
    titleKey: "page",
    children:[
      {
        id:"2-1",
        titleKey:"page-title",
        meta:{
          name:"h2",
          props:{
            rxText:'Page title',
          }
        }
      },  
      {
        id:"2-2",
        titleKey:"portlet",
        meta:      {
          name:'Portlet',
          props: {
            elevation: 6,
            open:true,
            withHeader:true,
            title:'Portlet',
            collapsible: true,
            spacingTop:2,              
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
        id:"2-3",
        titleKey:"portlet-body",
        meta:      {
          name:'PortletFormGridBody',
        }
      },
      {
        id:"2-4",
        titleKey:"portlet-footer",
        meta:      {
          name:'PortletFooter',
        }
      },
      {
        id:"2-5",
        titleKey:"medias-portlet",
        meta:      {
          name:'MediasPortlet',
          props: {
            elevation: 6,
            //spacingTop:2,              
          },
        }
      },
    ]
  },
  {
    id:"3",
    titleKey: "form",
    children:[
      {
        id:"3-1",
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
        id:"3-2",
        titleKey:"date",
        meta:{
          name: 'FormGridItem',
          props:{
            as:'TextField',
            label:"Date",
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
      },
      {
        id:"3-6",
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
        id:"3-7",
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
    id:"4",
    titleKey: "relations",
    icon:"mdi-relation-many-to-many",
  },
  {
    id:"5",
    titleKey: "customized",
    icon:"mdi-puzzle",
  },
]