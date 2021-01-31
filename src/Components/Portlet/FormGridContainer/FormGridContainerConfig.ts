import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { MetaConfig } from "../../../Base/RXNode/MetaConfig";

export class FormGridContainerConfig extends MetaConfig{
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === "FormGridItem"){
      return true
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'direction',
        labelKey:'direction',
        propType:'select',
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
        labelKey:'justify',
        propType:'select',
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
        labelKey:'align-content',
        propType:'select',
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
        labelKey:'align-items',
        propType:'select',
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
        labelKey:'spacing',
        propType:'number',
        props:{
          'min':0,
          'max':10,
        }
      },
    ]
  }

}