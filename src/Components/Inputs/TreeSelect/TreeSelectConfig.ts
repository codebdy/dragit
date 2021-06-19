import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import inputConfig from "Components/common/configs/inputConfig";
import itemsConfig from "Components/common/configs/itemsConfig";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import helperTextConfig from "Components/common/configs/helperTextConfig";

export class TreeSelectConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...inputConfig,
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
        name:'multiple',
        labelKey:'multiple-select',
        propType:'boolean',
      },
      {
        name:'itemKey',
        labelKey:'item-key',
        propType:'string',
      },
      {
        name:'itemName',
        labelKey:'item-name',
        propType:'string',
      },

      helperTextConfig,
      itemsConfig,
    ]
  }


}