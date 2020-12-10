import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";
import ListViewBatcthCommandDialog from "components/ListView/PropsInputs/ListViewBatcthCommandDialog";
import ListViewColumnsDialog from "./PropsInputs/ListViewColumnsDialog";
import ListViewFiltersDialog from "./PropsInputs/ListViewFiltersDialog";
import ListViewRowCommandDialog from "./PropsInputs/ListViewRowCommandDialog";
import { IMeta } from "base/Model/IMeta";
import marginRules from "base/Rules/marginRules";
import elevationRules from "base/Rules/elevationRules";

export class ListViewRule extends Rule{
  empertyPadding = '';
  
  accept(child:IMeta){
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
    ]
  }

}