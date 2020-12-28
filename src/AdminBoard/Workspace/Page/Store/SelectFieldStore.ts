import { IMeta } from "base/Model/IMeta";
import { makeAutoObservable } from "mobx";
import { IFieldStore } from "./FieldStore";
export class SelectFieldStore implements IFieldStore{
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
    let itemKey = this.meta.props?.itemKey;
    //let itemName = this.meta.props?.itemName;
    itemKey = this.meta.props?.query ? itemKey : 'slug';
    //itemName = this.meta.props?.query ? itemName : 'label';
    return ` ${this.meta?.props?.field} {${itemKey ? itemKey : 'id'}} `;
  }

}


