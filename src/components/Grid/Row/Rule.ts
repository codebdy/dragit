import { Rule } from "../../../base/Rules/Rule";
import { INode } from "../../../designer/PageEditor/Core/Node/INode";
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
          items:[
            {
              value:'stretch',
              label:'Stretch',
            },
            {
              value:'center',
              label:'Center',
            },
            {
              value:'flex-start',
              label:'Flex Start',
            },
            {
              value:'flex-end',
              label:'Flex End',
            },
            {
              value:'space-between',
              label:'Space Between',
            },
            {
              value:'space-around',
              label:'Space Around',
            },
          ]
        }
      },
      {
        name:'alignItems',
        label:'align-items',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'flex-start',
              label:'Flex Start',
            },
            {
              value:'center',
              label:'Center',
            },
            {
              value:'flex-end',
              label:'Flex End',
            },
            {
              value:'stretch',
              label:'Stretch',
            },
            {
              value:'baseline',
              label:'Baseline',
            },
          ],
        }
      },
      {
        name:'direction',
        label:'direction',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'row',
              label:'Row'
            },
            {
              value:'row-reverse',
              label:'Row Reverse'
            },
            {
              value:'column',
              label:'Column'
            },
            {
              value:'column-reverse',
              label:'Column Reverse'
            },
          ]
        }
      },
      {
        name:'justify',
        label:'justify',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'flex-start',
              label:'Flex Start'
            },
            {
              value:'center',
              label:'Center'
            },
            {
              value:'flex-end',
              label:'Flex End'
            },
            {
              value:'space-between',
              label:'Space Between'
            },
            {
              value:'space-around',
              label:'Space Around'
            },
            {
              value:'space-evenly',
              label:'Space Evenly'
            },
          ]
        }
      },
      {
        name:'spacing',
        label:'spacing',
        input:NumberInput,
        props:{
          'min':0,
          'max':10,
        }
      },
    ]
  }

}