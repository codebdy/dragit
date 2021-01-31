import { IPropConfig } from "rx-drag/models/IPropConfig";

const inputConfig:Array<IPropConfig> =[
  {
    name:'variant',
    labelKey:'variant',
    propType:'select',
    props:{
      items:[
        {
          value:'filled',
          label:'Filled'
        },
        {
          value:'outlined',
          label:'Outlined'
        },
        {
          value:'standard',
          label:'Standard'
        },
      ]
    },
  },
  {
    name:'label',
    labelKey:'label',
    propType:'string',
  }, 
  {
    name:'fullWidth',
    labelKey:'full-width',
    propType:'boolean',
  },
  {
    name:'required',
    labelKey:'required',
    propType:'boolean',
  },
]

export default inputConfig;