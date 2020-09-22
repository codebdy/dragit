import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";
import { IField } from "./IRule";
import ListViewColumnsDialog from "designer/Attrebutebox/Inputs/ListViewColumnsDialog";
import TableFiltersDialog from "designer/Attrebutebox/Inputs/TableFiltersDialog";

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
        input:TableFiltersDialog,
      },

    ]
  }

}