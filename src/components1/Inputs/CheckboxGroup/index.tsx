import { FormControlLabel,Checkbox, FormControl, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import { remove } from 'utils/ArrayHelper';
import { MetaItem } from 'base1/Model/MetaItem';
import React from 'react';


const CheckboxGroup = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange, row, size, color, value = [],  error, helperText, items=[], ...rest} = props;
  const isChecked = (slug:string)=>{
    for(var i = 0; i < value.lenght; i ++){
      if(value[i] === slug){
        return true;
      }
    }
    return false;
  }
  
  const handleChange = (slug:string, subValue:boolean) => {
    let newValue = [...value];
    if(!subValue){
      remove(slug, newValue);
    }
    else{
      newValue = [...newValue, slug];
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
      <FormGroup row = {row}>
        {
          items.map((item:MetaItem, index:number)=>{
            return (
              <FormControlLabel
                key = {index}
                control={<Checkbox 
                  checked={isChecked(item.slug)} 
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
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
})


export default CheckboxGroup