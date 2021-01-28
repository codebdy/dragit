import { MetaConfig } from "../../../Base/RXNode/MetaConfig";
import OptionSelect from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import { IPropConfig } from "../../../rx-drag/models/IPropConfig";
import NumberInput from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/NumberInput";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";

export class GridRowRule extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';
  labelKey ="row";

  accept(child:IMeta){
    if(child.name === 'GridColumn'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
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