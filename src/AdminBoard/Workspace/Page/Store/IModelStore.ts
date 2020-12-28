import { IFieldStore } from "./FieldStore";

export interface IModelStore{
  loading?:boolean;
  setFieldStore:(fieldName:string, fieldStore:IFieldStore)=>void;
  getFieldStore:(fieldName:string)=>IFieldStore|undefined;
}