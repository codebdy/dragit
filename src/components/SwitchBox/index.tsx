import { FormControlLabel, Switch } from '@material-ui/core';
import withSkeleton from 'base/HOCs/withSkeleton';
import React from 'react';


const SwitchBox = (props:any)=>{
  const {label, name, onChange,  value,  fullWidth, error, helperText, ...rest} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
    onChange({
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
          checked = {value||false}
          onChange = {handleChange}
          {...rest}
        />
      }
      label={label}
    />

  )
}


const SwitchBoxAny = withSkeleton(SwitchBox) as any;

export default SwitchBoxAny