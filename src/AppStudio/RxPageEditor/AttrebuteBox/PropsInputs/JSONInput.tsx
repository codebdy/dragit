import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';
import { useState } from 'react';
import { useEffect } from 'react';
import { stringValue } from 'rx-drag/utils/stringValue';

export default function JSONInput(props:PropsInputProps){
  const {label, value, onChange, xs = 6, ...rest} = props;
  const [inputValue, setInputValue] = useState<any>();

  useEffect(()=>{
    setInputValue(value);
  },[value])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue(newValue);
  }; 

  const handleBlur = ()=>{
    onChange(inputValue);  
  }

  return (
    <Grid item xs = {xs}>
      <TextField
        label={label}
        value={stringValue(inputValue)}
        onChange={handleChange}
        onBlur = {handleBlur}
        size="small"
        fullWidth
        multiline
        rows={8}
        variant = "outlined"
        {...rest}
      />
    </Grid>
  )
}
