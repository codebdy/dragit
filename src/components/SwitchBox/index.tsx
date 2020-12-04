import { FormControlLabel, Switch } from '@material-ui/core';
import React from 'react';


const SwitchBox = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange,  value,  fullWidth, error, helperText, ...rest} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
    onChange && onChange({
      target:{
        name:name,
        value:newValue,        
      }
    });
  }; 
  
  return (
    <FormControlLabel
      control={
        <Switch
          ref = {ref}
          checked = {value||false}
          onChange = {handleChange}
          {...rest}
        />
      }
      label={label}
    />

  )
})


export default SwitchBox