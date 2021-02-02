import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";
import elevationConfig from "Components/common/configs/elevationConfig";
import squareConfig from "Components/common/configs/squareConfig";

export class ListViewConfig extends MetaConfig{
  editPaddingY = '8px';
  editPaddingX = '8px';

  accept(child:IMeta){
    if(child.name === 'ListViewBody'){
      return true;
    }
    if(child.name === 'ListViewToolbar'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'variant',
        labelKey:'variant',
        propType:'select',
        props:{
          items:[
            {
              value:'elevation',
              label:'Elevation',
            },
            {
              value:'outlined',
              label:'Outlined',
            },
          ]
        }
      },
      ...elevationConfig,
      squareConfig,
      {
        name:'query',
        labelKey:'query-gql',
        propType:'string',
        props:{
          xs:12
        }
      },
      {
        name:'remove',
        labelKey:'remove-gql',
        propType:'string',
        props:{
          xs:12
        }
      },
      {
        name:'update',
        labelKey:'update-gql',
        propType:'mutation',
      }
    ]
  }

}