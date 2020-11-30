import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { FormEvent, useEffect, useState } from 'react';
import useModel from '../useModel';
import useModelLoading from '../useModelLoading';
import { IForm, FormContext, defultForm } from './useFormContext';
import intl from 'react-intl-universal';

export default function PageForm(
  props:{
    children:any,
    onSubmit:(data:any)=>void,
  }
){
  const {onSubmit, children} = props;
  const [form, setForm] = useState<IForm>(defultForm());
  const model = useModel();
  const loading = useModelLoading();
  const [openAlert, setOpentAlert] = useState(false);

  const forceUpdate = (newForm:IForm)=>{
    setForm({...newForm});
  }

  useEffect(()=>{
    if(!loading){
      if(model){
        setForm({
          ...form,
          defaultValues:model,
          values:JSON.parse(JSON.stringify(model)),
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
    console.log(form.registers);
    let passed = true;
    form.errors = {};
    for (let validateField in form.registers){
      const value = form.values[validateField];
      const errorMsg = form.registers[validateField].validate(value);
      if(errorMsg){
        passed = false;
        console.log('error field', validateField, value, errorMsg)
        form.errors[validateField] = errorMsg;
      }
    }
    return passed;
  }

  const handleSubmit =  (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();    
    if(!validate()){
      setOpentAlert(true);
      setForm({...form});
      return;
    }

    onSubmit(form.values);
  }

  const handleCloseAlert = ()=>{
    setOpentAlert(false);
  }

  return (
      <form onSubmit={handleSubmit}>
        <FormContext.Provider value = {form}>
          {children}
        </FormContext.Provider>
        <Dialog
          open={openAlert}
          onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert severity="error"  onClose={handleCloseAlert}>
            <AlertTitle>{intl.get('error')}</AlertTitle>
            {intl.get('input-error')} — <strong>{intl.get('please-confirm')}</strong>
          </Alert>      
        </Dialog>        
      </form>
  )
}
