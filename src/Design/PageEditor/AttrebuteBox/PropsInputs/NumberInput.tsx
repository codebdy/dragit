import React, { useEffect } from 'react';
import { Grid, TextField} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function NumberInput(props:PropsInputProps&{
  min?:number,
  max?:number,
  defaultValue?:number,
  xs?:boolean | 12 | 2 | 1 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined,
}){
  const {min, max, defaultValue, label, value, onChange, xs=6, ...rest} = props || {};
  const [inputValue, setInputValue] = React.useState(value);
  
  useEffect(()=>{
    setInputValue(value);
  },[value])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = parseInt(event.target.value as string);
    newValue = min !== undefined && newValue < min ? min : newValue
    newValue = max !== undefined && newValue > max ? max : newValue
    setInputValue(newValue);
    onChange(newValue);
  };  

  return (
    <Grid item xs = {xs}>
      <TextField
        type="number"
        label={label}
        value={inputValue || defaultValue || min || 0}
        onChange={handleChange}
        size="small"
        fullWidth
        variant = "outlined"
        {...rest}
      />
    </Grid>
  )
}
