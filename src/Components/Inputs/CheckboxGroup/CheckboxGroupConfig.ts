import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import colorConfig from "Components/common/configs/colorConfig";
import itemsConfig from "Components/common/configs/itemsConfig";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import sizeConfig from "Components/common/configs/sizeConfig";
import helperTextConfig from "Components/common/configs/helperTextConfig";

export class CheckboxGroupConfig extends MetaConfig{
  //editPaddingY = '';
  //editPaddingX = '';
  //empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      {
        name:'label',
        labelKey:'label',
        propType:'string',
      },
      colorConfig,
      sizeConfig,
      {
        name:'row',
        labelKey:'row-show',
        propType:'boolean',
      },
      helperTextConfig,
      itemsConfig
    ]
  }

}