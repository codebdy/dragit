import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import colorConfig from "Components/common/configs/colorConfig";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import sizeConfig from "Components/common/configs/sizeConfig";

export class CheckboxRule extends MetaConfig{
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
      colorConfig,
      sizeConfig,
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      }
    ]
  }

}