import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { inputVariantConfig } from "Components/common/configs/inputVariantConfig";
import { textboxSizeConfig } from "Components/Inputs/TextBox/textboxSizeConfig";
import marginConfigs from "Components/common/configs/marginConfigs";

export class ListViewKeywordFilterConfig extends MetaConfig{
  empertyPadding = '';
  
  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      inputVariantConfig,
      textboxSizeConfig
    ]
  }

}