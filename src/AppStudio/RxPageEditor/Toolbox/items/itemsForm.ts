export default{
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
}