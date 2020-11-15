import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IProp } from "../../base/IProp";
import StringInput from "base/PropsInputs/StringInput";
import ListViewBatcthCommandDialog from "components/ListView/PropsInputs/ListViewBatcthCommandDialog";
import ListViewColumnsDialog from "./PropsInputs/ListViewColumnsDialog";
import ListViewFiltersDialog from "./PropsInputs/ListViewFiltersDialog";
import ListViewRowCommandDialog from "./PropsInputs/ListViewRowCommandDialog";

export class ListViewRule extends Rule{
  empertyPadding = '';
  
  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
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