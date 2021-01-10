import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import StringInput from "Base/PropsInputs/StringInput";
import ListViewBatcthCommandDialog from "Components/ListView/PropsInputs/ListViewBatcthCommandDialog";
import ListViewColumnsDialog from "./PropsInputs/ListViewColumnsDialog";
import ListViewFiltersDialog from "./PropsInputs/ListViewFiltersDialog";
import ListViewRowCommandDialog from "./PropsInputs/ListViewRowCommandDialog";
import { IMeta } from "Base/Model/IMeta";
import marginRules from "Base/Rules/marginRules";
import elevationRules from "Base/Rules/elevationRules";
import apiRule from "Base/Rules/apiRule";

export class ListViewRule extends Rule{
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

  getFields(): Array<IProp>{
    return [
      ...marginRules,
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
      apiRule,
    ]
  }

}