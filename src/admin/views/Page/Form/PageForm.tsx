import React, { FormEvent, useEffect, useState } from 'react';
import useModel from '../useModel';
import useModelLoading from '../useModelLoading';
import { IForm, FormContext } from './RXForm';

export default function PageForm(
  props:{
    children:any
  }
){
  const {children} = props;
  const [form, setForm] = useState<IForm>({});
  const model = useModel();
  const loading = useModelLoading();

  const forceUpdate = ()=>{
    setForm({...form});
  }

  useEffect(()=>{
    if(!loading){
      if(model){
        setForm({
          defaultValues:model,
          values:JSON.parse(JSON.stringify(model)),
          errors:{},
          status:{},
          forceUpdate:forceUpdate,
        })
      }
      else{
        setForm({
          defaultValues:{},
          values:{},
          errors:{},
          status:{},
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
