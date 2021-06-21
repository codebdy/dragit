import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class JsxTemplateParserConfig extends MetaConfig{

  hasMultiAction?:boolean = true;

  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      {
        name:'template',
        labelKey:'template',
        propType:'string',
        props:{
          xs:12,
          multiline:true,
          rows:5,
        }
      },
      {
        name:'showSkeleton',
        labelKey:'show-skeleton',
        propType:'boolean',
        props:{
          xs:12,
        }
      }
    ]
  }

}