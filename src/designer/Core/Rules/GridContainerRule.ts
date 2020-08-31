import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { GridItemRule } from "./GridItemRule";
import { INode } from "../Node/INode";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import { IField } from "./IRule";

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
          'stretch':'Stretch',
          'center':'Center',
          'flex-start':'Flex Start',
          'flex-end' : 'Flex End',
          'space-between':'Space Between',
          'space-around' : 'Space Around'
        }
      },
      {
        name:'alignItems',
        label:'Align Items',
        input:OptionSelect,
        schema:{
          'flex-start':'Flex Start',
          'center':'Center',
          'flex-end' : 'Flex End',
          'stretch':'Stretch',
          'baseline' : 'Baseline'
        }
      },
      {
        name:'justify',
        label:'Justify',
        input:OptionSelect,
        schema:{
          'flex-start':'Flex Start',
          'center':'Center',
          'flex-end' : 'Flex End',
          'space-between':'Space Between',
          'space-around' : 'Space Around',
          'space-evenly' : 'Space Evenly'
        }
      },
    ]
  }

}