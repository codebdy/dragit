import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { stringValue } from 'rx-drag/utils/stringValue';

export const TextBox = React.forwardRef((props:any, ref:any)=>{
  const {value, shrinkLabel, type, onChange, ...rest} = props;
  const [inputValue, setInputValue] = useState(value);

  useEffect(()=>{
    setInputValue(value);
  },[value])

  const handleBlur = ()=>{
    if(type === 'number'){
      onChange && onChange({target:{value: inputValue ? parseFloat(inputValue) : undefined}})
    }
    else{
      onChange && onChange({target:{value: inputValue}})
    }
  }

  const handleOnchange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = event.target.value as string;
    setInputValue(newValue);

  }

  return (
    <TextField 
      ref={ref}
      type = {type}
      onChange = {handleOnchange}
      onBlur = {handleBlur}
      value = {stringValue(inputValue)}
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
