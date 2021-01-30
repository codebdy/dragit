import { TextField } from '@material-ui/core';
import React from 'react';

export const TextBox = React.forwardRef((props:any, ref:any)=>{
  const {value, shrinkLabel, type, onChange, ...rest} = props;

  const handleOnchange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = event.target.value as string;
    if(type === 'number'){
      onChange && onChange({target:{value: newValue ? parseFloat(newValue) : undefined}})
    }
    else{
      onChange && onChange(event)
    }
  }

  return (
    <TextField 
      ref={ref}
      type = {type}
      onChange = {handleOnchange}
      value = {value === undefined ? '' : value}
      {...rest} 
      InputLabelProps = {
        shrinkLabel ? 
        {
          shrink: true,
        } 
        : undefined
      }
    />
  )
})
