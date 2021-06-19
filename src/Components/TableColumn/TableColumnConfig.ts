import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class TableColumnConfig extends MetaConfig{
 
  accept(child:IMeta){
    if(child.name === 'TableColumn' 
      || child.name.startsWith('ListView')
    ){
      return false;
    }
    return true;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      {
        name:'label',
        labelKey:'label',
        propType:'string',
      },
      {
        name:'width',
        labelKey:'width',
        propType:'string',
      },
      {
        name:'align',
        labelKey:'align',
        propType:'select',
        props:{
          items:[
            {
              value:'center',
              label:'Center'
            },
            {
              value:'inherit',
              label:'Inherit'
            },
            {
              value:'justify',
              label:'Justify'
            },
            {
              value:'left',
              label:'Left'
            },
            {
              value:'right',
              label:'Right'
            },
          ]
        },
      },
      {
        name:'size',
        labelKey:'size',
        propType:'select',
        props:{
          items:[
            {
              value:'medium',
              label:'Medium'
            },
            {
              value:'small',
              label:'Small'
            },
          ]
        },
      },
    ]
  }

}