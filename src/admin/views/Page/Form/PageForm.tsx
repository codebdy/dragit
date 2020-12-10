import React, { FormEvent, useEffect, useState } from 'react';
import useModel from '../useModel';
import useModelLoading from '../useModelLoading';
import { IForm, FormContext, defultForm } from "../../../../base/FormContext";
import { cloneObject } from 'utils/cloneObject';

export default function PageForm(
  props:{
    children:any,
    onSubmit:(data:any)=>void,
    submit:boolean,
    onSubmitError:()=>void,
  }
){
  const {onSubmit, children, submit, onSubmitError} = props;
  const [form, setForm] = useState<IForm>(defultForm());
  const model = useModel();
  const loading = useModelLoading();


  const forceUpdate = (newForm:IForm)=>{
    setForm({...newForm});
  }

  useEffect(()=>{
    if(!loading){
      if(model){
        setForm({
          ...form,
          defaultValues:model,
          values:cloneObject(model),
          forceUpdate:forceUpdate,
        })
      }
      else{
        setForm({
          ...form,
          forceUpdate:forceUpdate,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, loading])

  const validate =():boolean=>{
    let passed = true;
    form.errors = {};
    for (let validateField in form.registers){
      // eslint-disable-next-line no-eval
      const value = eval('form.values.' + validateField);
      const errorMsg = form.registers[validateField].validate(value);
      if(errorMsg){
        passed = false;
        form.errors[validateField] = errorMsg;
      }
    }
    return passed;
  }

  const handleSubmit =  (event?:FormEvent<HTMLFormElement>)=>{
    event && event.preventDefault();    
    if(!validate()){
      setForm({...form});
      onSubmitError();
      return;
    }

    onSubmit(form.values);
  }

  //根据父组件指示提交表单
  useEffect(()=>{
    if(submit){
      handleSubmit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit])

  return (
      <form /*onSubmit={handleSubmit}*/>
        <FormContext.Provider value = {form}>
          {children}
        </FormContext.Provider>       
      </form>
  )
}
