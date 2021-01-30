import { FormControlLabel, Switch } from '@material-ui/core';
import React from 'react';


export const SwitchBox = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange,  value, onValue = true, offValue=false, fullWidth, error, helperText, ...rest} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
    onChange && onChange({
      target:{
        name:name,
        value:newValue ? onValue : offValue,        
      }
    });
  }; 
  
  return (
    <FormControlLabel
      control={
        <Switch
          ref = {ref}
          checked = {value === onValue}
          onChange = {handleChange}
          {...rest}
        />
      }
      label={label}
    />

  )
})
