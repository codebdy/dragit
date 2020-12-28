import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";

export interface IFieldStore{
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;

  setValue: (value:any)=>void;
  setModel:(model: any)=>void;
  toFieldsGQL:()=>void;
}

export class FieldStore implements IFieldStore{
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  constructor(meta:IMeta) {
    makeAutoObservable(this);
    this.meta = meta;
  }

  toFieldsGQL() {
    return ` ${this.meta?.props?.field} `;
  }

  setModel(model: any) {
    const fieldName = this.meta.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.value = fieldValue;
  }

  setValue(value: any) {
    this.value = value;
  }

}


