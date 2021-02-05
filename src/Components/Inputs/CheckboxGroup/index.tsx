import { FormControlLabel,Checkbox, FormControl, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import { remove } from 'rx-drag/utils/ArrayHelper';
import { MetaItem } from 'Base/Model/MetaItem';
import React from 'react';


const CheckboxGroup = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange, row, size, color, value = [],  error, helperText, items=[], ...rest} = props;
  const isChecked = (id:string)=>{
    for(var i = 0; i < value.lenght; i ++){
      if(value[i] === id){
        return true;
      }
    }
    return false;
  }
  
  const handleChange = (id:string, subValue:boolean) => {
    let newValue = [...value];
    if(!subValue){
      remove(id, newValue);
    }
    else{
      newValue = [...newValue, id];
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
                  checked={isChecked(item.id)} 
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
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
})


export default CheckboxGroup