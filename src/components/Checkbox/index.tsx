import { FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import React from 'react';


const Checkbox = React.forwardRef((props:any, ref:any)=>{
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
        <MuiCheckbox
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


export default Checkbox