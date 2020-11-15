import { Rule } from "../../../base/Rules/Rule";
import { INode } from "../../../designer/Core/Node/INode";
import OptionSelect from "base/PropsInputs/OptionSelect";
import { IProp } from "../../../base/IProp";
import NumberInput from "base/PropsInputs/NumberInput";

export class GridRowRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="row";

  accept(child:INode){
    if(child.meta.name === 'GridColumn'){
      return true;
    }
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'alignContent',
        label:'align-content',
        input:OptionSelect,
        props:{
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
        label:'align-items',
        input:OptionSelect,
        props:{
          'Flex Start':'flex-start',
          'Center':'center',
          'Flex End' : 'flex-end',
          'Stretch':'stretch',
          'Baseline' : 'baseline'
        }
      },
      {
        name:'direction',
        label:'direction',
        input:OptionSelect,
        props:{
          'Row':'row',
          'Row Reverse':'row-reverse',
          'Column' : 'column',
          'Column Reverse':'column-reverse',
        }
      },
      {
        name:'justify',
        label:'justify',
        input:OptionSelect,
        props:{
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
        label:'spacing',
        input:NumberInput,
        props:{
          'min':0,
          'max':10,
          'step':1,
        }
      },
    ]
  }

}