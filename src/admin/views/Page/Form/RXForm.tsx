import React from "react";
import { useContext } from "react";
import { Regeister, ValidationRules } from "./validator";

export interface IForm{
  defaultValues?:any,
  values:any,
  errors?:any,
  status?:any,
  forceUpdate?:(newForm:IForm)=>void,
  registers:{[key:string]:Regeister},
}

export const defultForm = {
  defaultValues:{},
  values:{},
  errors:{},  
  registers:{}
};

export const FormContext = React.createContext<IForm>(defultForm);

export function useFormContext():IForm&{
  setValue:(field:string, value:any)=>void,
  validate:(field:string)=>void,
  register:(field:string, rules:ValidationRules)=>void,
}{
  const formContext = useContext(FormContext);
  const setValue = (field:string, value:any) =>{
    formContext.values = formContext.values ? formContext.values : {};
    formContext.values[field] = value;
  }

  //该方法会导致重新渲染
  const validate =  (field:string) =>{
    const errorMessage = formContext.registers[field]?.validate(formContext.values[field]);
    formContext.errors = formContext.errors ? formContext.errors : {};
    formContext.errors[field] = errorMessage;
    formContext.forceUpdate && formContext.forceUpdate(formContext);
  }

  const register = (field:string, rules:ValidationRules) => {
    formContext.registers[field] = new Regeister(rules);
  }
  return {...formContext, setValue, validate, register};
}

