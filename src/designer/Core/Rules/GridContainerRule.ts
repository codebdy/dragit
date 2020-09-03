import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { GridItemRule } from "./GridItemRule";
import { INode } from "../Node/INode";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import { IField } from "./IRule";
import NumberInput from "designer/Attrebutebox/Inputs/NumberInput";

export class GridContainerRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="row";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.container === true){
      return true;
    }
    return false;
  }

  accept(child:INode){
    if(child.rule instanceof GridItemRule){
      return true;
    }
    return false;
  }

  getFields(): Array<IField>{
    return [
      {
        name:'alignContent',
        label:'Align Content',
        input:OptionSelect,
        schema:{
          'Stretch':'stretch',
          'Center':'center',
          'Flex Start':'flex-start',
          'Flex End' : 'flex-end',
          'Space Between':'space-between',
          'Space Around' : 'space-around'
        }
      },
      {
        name:'alignItems',
        label:'Align Items',
        input:OptionSelect,
        schema:{
          'Flex Start':'flex-start',
          'Center':'center',
          'Flex End' : 'flex-end',
          'Stretch':'stretch',
          'Baseline' : 'baseline'
        }
      },
      {
        name:'direction',
        label:'Direction',
        input:OptionSelect,
        schema:{
          'Row':'row',
          'Row Reverse':'row-reverse',
          'Column' : 'column',
          'Column Reverse':'column-reverse',
        }
      },
      {
        name:'justify',
        label:'Justify',
        input:OptionSelect,
        schema:{
          'Flex Start':'flex-start',
          'Center':'center',
          'Flex End' : 'flex-end',
          'Space Between':'space-between',
          'Space Around' : 'space-around',
          'Space Evenly' : 'space-evenly'
        }
      },
      {
        name:'spacing',
        label:'Spacing',
        input:NumberInput,
        schema:{
          'min':0,
          'max':10,
          'step':1,
        }
      },
    ]
  }

}