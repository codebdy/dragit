import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function StringInput(props:PropsInputProps){
  const {label, value, onChange, ...rest} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue(newValue);
  }; 
  
  useEffect(()=>{
    setInputValue(value);
  },[value])

  const handleEndInput = ()=>{
    if(value !== inputValue){
      onChange(inputValue);      
    }
  }

  return (
    <TextField
      label={label}
      value={inputValue||''}
      onChange={handleChange}
      size="small"
      fullWidth
      variant = "outlined"
      onBlur = {handleEndInput}
      onKeyUp = {e=>{
        if(e.key === 'Enter') {
          handleEndInput()
        }
      }
    }
      {...rest}
    />
  )
}
