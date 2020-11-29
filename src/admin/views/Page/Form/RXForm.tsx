import React from "react";
import { useContext } from "react";
import { ValidationRules } from "./validator";

export interface IForm{
  defaultValues?:any,
  values?:any,
  errors?:any,
  status?:any,
  forceUpdate?:()=>void,
}
export const FormContext = React.createContext<IForm>({});

export function useForm(){
  const formContext = useContext(FormContext);
  return formContext;
}

export function useErrors(){
  const formContext = useContext(FormContext);
  return formContext.errors;
}

export function useSetValue(field:string, value:string){
  const formContext = useContext(FormContext);
  formContext.values[field] = value;
}

export function useSetRule(field:string, rule:ValidationRules){

}

export function useSetError(field:string, errorMessage:string){
  const formContext = useContext(FormContext);
  formContext.errors[field] = errorMessage;
  formContext.forceUpdate && formContext.forceUpdate();
}
