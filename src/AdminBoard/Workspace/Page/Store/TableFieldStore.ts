import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IModelStore } from "./IModelStore";
import { IFieldStore } from "./FieldStore";


export class TableFieldStore implements IFieldStore, IModelStore {
  defaultValue?: any;
  value?: any;
  error?: string;
  meta: IMeta;
  loading?: boolean;
  constructor(meta: IMeta) {
    this.meta = meta;
    makeAutoObservable(this);
  }

  setFieldStore(fieldName: string, fieldStore: IFieldStore) {
  }

  getFieldStore(fieldName:string){
    return undefined;
  }
  
  setValue(value: any) {
  }

  setModel(model: any) {
  }

  toFieldsGQL() {
  }

}
