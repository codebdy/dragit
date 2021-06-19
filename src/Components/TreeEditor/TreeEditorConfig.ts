import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import elevationConfig from "Components/common/configs/elevationConfig";
import marginConfigs from "Components/common/configs/marginConfigs";

export class TreeEditorConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  accept(child:IMeta){
    if(child.name === 'FormGridContainer'){
      return true;
    }
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,   
      {
        name:'title',
        labelKey:'title',
        propType:'string',     
        props:{
          xs:12
        } 
      },
      {
        name:'query',
        labelKey:'query',
        propType:'string',
        props:{
          xs:12
        }
      },
      {
        name:'mutation',
        labelKey:'mutation',
        propType:'string',
        props:{
          xs:12
        }
      },

    ]
  }

}