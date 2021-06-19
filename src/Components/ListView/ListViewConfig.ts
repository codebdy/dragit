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
    if(child.name === 'ListViewPagination'){
      return true;
    }

    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
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