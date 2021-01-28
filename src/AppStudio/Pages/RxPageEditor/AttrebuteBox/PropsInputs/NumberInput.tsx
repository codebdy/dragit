import React from 'react';
import { Grid, TextField} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function NumberInput(props:PropsInputProps&{
  min?:number,
  max?:number,
  defaultValue?:number,
}){
  const {min, max, defaultValue, label, value, onChange, xs=6, ...rest} = props || {};
  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = parseInt(event.target.value as string);
    newValue = min !== undefined && newValue < min ? min : newValue
    newValue = max !== undefined && newValue > max ? max : newValue
    onChange(newValue);
  };  

  return (
    <Grid item xs = {xs}>
      <TextField
        type="number"
        label={label}
        value={value === undefined ? defaultValue || min || 0 : value}
        onChange={handleChange}
        size="small"
        fullWidth
        variant = "outlined"
        {...rest}
      />
    </Grid>
  )
}
