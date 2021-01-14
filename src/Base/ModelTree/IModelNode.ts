import { ID } from "Base/Model/graphqlTypes";
import { IFieldStore } from "./FieldStore";

export interface IModelNode{
  id:ID;
  loading?:boolean;
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
  getFieldStore:(fieldName:string)=>IFieldStore|undefined;
  removeFieldStore:(fieldName:string)=>void;
  getLabel:()=>string;
}