import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";
import { IField } from "./IRule";
import ListViewColumnsDialog from "designer/Attrebutebox/Inputs/ListViewColumnsDialog";
import ListViewFiltersDialog from "designer/Attrebutebox/Inputs/ListViewFiltersDialog";
import TextInput from "designer/Attrebutebox/Inputs/TextInput";
import ListViewActionDialog from "designer/Attrebutebox/Inputs/ListViewActionDialog";

export class ListViewRule extends Rule{
  empertyPadding = '';
  
  match(meta:IMeta){
     return meta.name === 'ListView';
  }

  accept(child:INode){
    return false;
  }

  getFields(): Array<IField>{
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
        input:ListViewActionDialog,
      },
      {
        name:'batchCommands',
        label:'batch-actions',
        input:ListViewActionDialog,
      },
      {
        name:'rowsPerPageOptions',
        label:'pager-options',
        input:TextInput,
      },
      {
        name:'defalutRowsPerPage',
        label:'rows-per-page',
        input:TextInput,
      },
    ]
  }

}