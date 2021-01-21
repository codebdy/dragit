import { IMetaConfig } from "./IMetaConfig";
import { IPropConfig } from "./IPropConfig";
import { IMeta } from "./IMeta";
import intl from 'react-intl-universal';

export class MetaConfig implements IMetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '16px';
  labelKey?: string;
  dropInMargin = 8;
  _label?:string;

  resolveLabel(meta:IMeta):string|undefined{
    let label = this.labelKey ? intl.get(this.labelKey) : this._label;
    return label ? label : meta.name;
  }


  set label(label:string){
    this._label = label;
  }

  accept(child:IMeta){
    return true;
  }

  getPropConfigs(): Array<IPropConfig>{
    return []
  }
}