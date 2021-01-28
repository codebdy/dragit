import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function StringInput(props:PropsInputProps){
  const {label, value, onChange, xs = 6, ...rest} = props;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    onChange(newValue);  

  }; 

  return (
    <Grid item xs = {xs}>
      <TextField
        label={label}
        value={value === undefined ? '' : value}
        onChange={handleChange}
        size="small"
        fullWidth
        variant = "outlined"
        {...rest}
      />
    </Grid>
  )
}
