import React from "react";
import { Regeister } from "../admin/views/Page/Form/Regeister";


export interface IForm {
  defaultValues?: any;
  values: any;
  errors?: any;
  status?: any;
  //forceUpdate?: (newForm: IForm) => void;
  valueChanged?: (field:string, value:any) =>void;
  registers: { [key: string]: Regeister; };
  onDirty?:()=>void;
}

export const defultForm = (onDirty?:()=>void) => {
  return {
    defaultValues: {},
    values: {},
    errors: {},
    registers: {},
    onDirty:onDirty,
  };
};

export const FormContext = React.createContext<IForm>(defultForm());
