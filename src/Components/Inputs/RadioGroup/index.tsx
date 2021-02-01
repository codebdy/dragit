import { FormControlLabel, FormControl, RadioGroup as MuiRadioGroup, FormHelperText, FormLabel, Radio } from '@material-ui/core';
import { MetaItem } from 'Base/Model/MetaItem';
import React from 'react';

const RadioGroup = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange, row, size, color, value,  error, helperText, items=[], ...rest} = props;
  
  const handleChange = (id:string, subValue:boolean) => {
    let newValue = value;
    if(!subValue){
      newValue = id;
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
                  checked={value ===item.id} 
                  onChange={e=>handleChange(item.id, e.target.checked)} 
                  name={item.id}
                  size = {size}
                  color = {color}
                />}
                label={item.name}
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