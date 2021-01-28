import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import colorRule from "Base/RXNode/Configs/colorRule";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import sizeRule from "Base/RXNode/Configs/sizeRule";

export class SwitchBoxRule extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      colorRule,
      sizeRule,
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      }
    ]
  }

}