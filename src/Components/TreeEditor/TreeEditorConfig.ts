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

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,   
      {
        name:'title',
        labelKey:'title',
        propType:'string',      
      },
     // {
     //   name:'apiForGet',
     //   label:'get-api',
        //input:ApiEditor,
      //},
      //{
      //  name:'apiForSave',
       // label:'submit-api',
        //input:ApiEditor,
      //}
    ]
  }

}