import { ID } from "Base/Model/graphqlTypes";
import { IMeta } from "Base/Model/IMeta";
import { RXNode } from "Base/RXNode/RXNode";
import { IFieldStore } from "./FieldStore";

export interface IModelNode{
  id:ID;
  node?:RXNode<IMeta>;
  loading?:boolean;
  isSelected?:boolean;
  setModel:(model:any)=>void;
  getModelNode:(name:string)=>IModelNode|undefined;
  updateDefaultValue:()=>void;
  setLoading:(loading?:boolean)=>void;
  clearDirty:()=>void;
  isDirty:()=>boolean|undefined;
  validate:()=>boolean;
  reset:()=>void;
  getChildren:()=>Array<IModelNode>|undefined;
  toFieldsGQL:()=>void;
  toInputValue:()=>any;
  setFieldStore:(fieldName:string, fieldStore:IFieldStore)=>void;
  getFieldStore:(fieldName?:string)=>IFieldStore|undefined;
  removeFieldStore:(fieldName:string)=>void;
  getLabel:()=>string;

  setSelected:(selected:boolean)=>void;
}