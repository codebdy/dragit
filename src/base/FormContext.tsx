import React from "react";
import { Regeister } from "../admin/views/Page/Form/Regeister";


export interface IForm {
  defaultValues?: any;
  values: any;
  errors?: any;
  status?: any;
  forceUpdate?: (newForm: IForm) => void;
  registers: { [key: string]: Regeister; };
}

export const defultForm = () => {
  return {
    defaultValues: {},
    values: {},
    errors: {},
    registers: {}
  };
};

export const FormContext = React.createContext<IForm>(defultForm());
