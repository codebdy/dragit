import { FormControlLabel, FormControl, RadioGroup as MuiRadioGroup, FormHelperText, FormLabel, Radio } from '@material-ui/core';
import { MetaItem } from 'base/Model/MetaItem';
import React from 'react';

const RadioGroup = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange, row, size, color, value,  error, helperText, items=[], ...rest} = props;
  
  const handleChange = (slug:string, subValue:boolean) => {
    let newValue = value;
    if(!subValue){
      newValue = slug;
    }

    onChange && onChange({
      target:{
        name:name,
        value:newValue,        
      }
    });
  }; 


  return (
    <FormControl ref={ref} component="fieldset" error = {error} {...rest}>
      <FormLabel component="legend">{label}</FormLabel>
      <MuiRadioGroup row = {row}>
        {
          items.map((item:MetaItem, index:number)=>{
            return (
              <FormControlLabel
                key = {index}
                control={<Radio 
                  checked={value ===item.slug} 
                  onChange={e=>handleChange(item.slug, e.target.checked)} 
                  name={item.slug}
                  size = {size}
                  color = {color}
                />}
                label={item.label}
              />
            )
          })
        }
      </MuiRadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
})


export default RadioGroup