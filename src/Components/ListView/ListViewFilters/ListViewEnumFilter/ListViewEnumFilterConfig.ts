import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";
import { textboxSizeConfig } from "Components/Inputs/TextBox/textboxSizeConfig";

export class ListViewEnumFilterConfig extends MetaConfig{
  empertyPadding = '';

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      textboxSizeConfig,
      {
        name:'metas',
        propType:'items',
        props:{
          idKey:'value',
          nameKey:'name',
        }
      }
    ]
  }

}