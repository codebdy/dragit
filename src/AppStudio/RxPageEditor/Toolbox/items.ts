
import portlet from './portlet'
import templates from './templates'

export default [
  {
    titleKey: "template",
    children:templates,
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
      {
        titleKey:"medias",
        meta:{name:'Medias'},
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
        meta:{
          name:'ListView',
          props:{
            elevation: 6,
          }
        },
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
  },
  {
    titleKey: "form",
    children:[
      {
        titleKey:"form-grid-container",
        meta: {
          name:'FormGridContainer',
        }
      },
      {
        titleKey:'form-grid-item',
        meta:{
          name:'FormGridItem',
        }
      },
      {
        titleKey:"text-field",
        meta:{
          name:"TextBox",
          props:{
            label:"TextField",
            variant:"outlined",
            fullWidth:true,
          }
        }
      },
      {
        titleKey:"switch",
        meta:{
          name:'SwitchBox',
          props:{
            label:'switch label',
          }
        },
      },
      {
        titleKey:"checkbox",
        meta:{
          name:'Checkbox',
          props:{
            label:'checkbox label',
          }
        },
      },
      {
        titleKey:"checkbox-group",
        meta:{
          name:'CheckboxGroup',
          props:{
            label:"Checkbox group",
            items:[
              {
                slug:'option1',
                label:'Option 1',
              },
              {
                slug:'option2',
                label:'Option 2',
              },
            ]
          }
        },
      },
      {
        titleKey:"radio-group",
        meta:{
          name:'RadioGroup',
          props:{
            label:"Radio group",
            items:[
              {
                slug:'option1',
                label:'Option 1',
              },
              {
                slug:'option2',
                label:'Option 2',
              },
            ]
          }
        },
      },

      {
        titleKey:"selectbox",
        meta:{
          name: 'SelectBox',
          props:{
            label:"Select",
            variant:"outlined",
            fullWidth:true,
          }
        },
      },
      {
        titleKey:"multi-selectbox",
        meta:{
          name: 'MultiSelectBox',
          props:{
            label:"Select",
            variant:"outlined",
            fullWidth:true,
          }
        },
      },
      {
        titleKey:"tree-select",
        meta:{
          name: 'TreeSelect',
          props:{
            label:"Tree Select",
            variant:"outlined",
            fullWidth:true,
          }
        },
      },
      {
        titleKey:"combobox",
        meta:{
          name: 'Combobox',
          props:{
            label:"Combobox",
            variant:"outlined",
            xs:6,
            data:{
            }
          }
        },
      },
      {
        title:"TinyMCE",
        meta:{
          name:"TinyMCE",
        }
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
    titleKey: "charts",
    children:[
      {
        titleKey:'antv-chart',
        meta:{
          name:'AntDesignChart',
          props:{
            chart:'Line',
            jsonProps:{},
          }
        }
      }
    ]
  },
]