
import listView from './listView'
import listViewToolbar from './listView/listViewToolbar'
import portlet from './portlet'

export default [
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
        titleKey:"typography",
        meta:{
          name:"Typography",
          props:{
            variant:"inherit",
            rxText: "Typography",
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