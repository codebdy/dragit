import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";
import ListViewBatcthCommandDialog from "Components/ListView/PropsInputs/ListViewBatcthCommandDialog";
import ListViewColumnsDialog from "./PropsInputs/ListViewColumnsDialog";
import ListViewFiltersDialog from "./PropsInputs/ListViewFiltersDialog";
import ListViewRowCommandDialog from "./PropsInputs/ListViewRowCommandDialog";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";
import elevationRules from "Base/RXNode/Configs/elevationRules";

export class ListViewRule extends MetaConfig{
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
      ...elevationRules,
      {
        name:'columns',
        label:'columns',
        input:ListViewColumnsDialog,
      },
      {
        name:'filters',
        label:'filters',
        input:ListViewFiltersDialog,
      },
      {
        name:'rowCommands',
        label:'row-actions',
        input:ListViewRowCommandDialog,
      },
      {
        name:'batchCommands',
        label:'batch-actions',
        input:ListViewBatcthCommandDialog,
      },
      {
        name:'rowsPerPageOptions',
        label:'pager-options',
        input:StringInput,
      },
      {
        name:'defalutRowsPerPage',
        label:'rows-per-page',
        input:StringInput,
      },
    ]
  }

}