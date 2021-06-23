import { MetaConfig } from "../../../Base/RXNode/MetaConfig";
import { IMeta } from "../../../Base/RXNode/IMeta";
import { IPropConfig } from "../../../rx-drag/models/IPropConfig";
import marginConfigs from "Components/common/configs/marginConfigs";

export class IconButtonConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasAction = true;

  accept(child:IMeta){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      {
        name:'icon',
        labelKey:'icon',
        propType:'string',
        props:{
          xs:12
        }
      },
      ...marginConfigs,
      {
        name:'color',
        labelKey:'color',
        propType:'select',
        props:{
          items:[
            {
              value:'default',
              label:'Default'
            },
            {
              value:'inherit',
              label:'Inherit'
            },
            {
              value:'primary',
              label:'Primary'
            },
            {
              value:'secondary',
              label:'Secondary'
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
      {
        name:'disabled',
        labelKey:'disabled',
        propType:'boolean',
      },
      {
        name:'disableElevation',
        labelKey:'disableElevation',
        propType:'boolean',
      },
      {
        name:'disableRipple',
        labelKey:'disableRipple',
        propType:'boolean',
      },
    ]
  }

  getDataConfig(): Array<IPropConfig>{
    return [];
  }
}