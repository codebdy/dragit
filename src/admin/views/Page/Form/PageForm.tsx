import React, { FormEvent, useEffect, useState } from 'react';
import useModel from '../useModel';
import useModelLoading from '../useModelLoading';
import { IForm, FormContext, defultForm } from './useFormContext';

export default function PageForm(
  props:{
    children:any
  }
){
  const {children} = props;
  const [form, setForm] = useState<IForm>(defultForm);
  const model = useModel();
  const loading = useModelLoading();

  const forceUpdate = (newForm:IForm)=>{
    setForm({...newForm});
  }
  //console.log('form',form.values)
  useEffect(()=>{
    if(!loading){
      if(model){
        setForm({
          ...defultForm,
          defaultValues:model,
          values:JSON.parse(JSON.stringify(model)),
          forceUpdate:forceUpdate,
        })
      }
      else{
        setForm({
          ...defultForm,
          forceUpdate:forceUpdate,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, loading])



  const handleSubmit =  (event:FormEvent<HTMLFormElement>)=>{
    console.log(event);
    event.preventDefault();
  }

  return (
      <form onSubmit={handleSubmit}>
        <FormContext.Provider value = {form}>
          {children}
        </FormContext.Provider>
      </form>
  )
}
