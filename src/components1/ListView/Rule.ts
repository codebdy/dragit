import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import StringInput from "base1/PropsInputs/StringInput";
import ListViewBatcthCommandDialog from "components1/ListView/PropsInputs/ListViewBatcthCommandDialog";
import ListViewColumnsDialog from "./PropsInputs/ListViewColumnsDialog";
import ListViewFiltersDialog from "./PropsInputs/ListViewFiltersDialog";
import ListViewRowCommandDialog from "./PropsInputs/ListViewRowCommandDialog";
import { IMeta } from "base1/Model/IMeta";
import marginRules from "base1/Rules/marginRules";
import elevationRules from "base1/Rules/elevationRules";
import apiRule from "base1/Rules/apiRule";

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