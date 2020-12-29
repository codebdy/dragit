import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IFieldStore } from "./FieldStore";
export class MediaFieldStore implements IFieldStore{
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  
  constructor(meta:IMeta) {
    makeAutoObservable(this);
    this.meta = meta;
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


  toFieldsGQL() {
    return ` ${this.meta?.props?.field} {id thumbnail title src} `;
  }

}


