import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";
import { IField } from "./IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import { colWidthOptions } from "./GridItemRule";

export class FormGridItemRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasData = true;

  match(meta:IMeta){
    return meta.name === 'FormGridItem';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Form item:' + meta.props?.as;
  }

  getFields(): Array<IField>{
    return [
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        schema:{
          'Filled' : 'filled',
          'Outlined': 'outlined',
          'Standard' : 'standard',
        },
      },
      ...colWidthOptions
    ]
  }

}