import React, { useEffect } from 'react';
import { FormControlLabel, Switch} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function BooleanInput(props:PropsInputProps){
  const {label, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(!!value);
  
  useEffect(()=>{
    setInputValue(!!value);
  },[value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
    setInputValue(newValue);
    onChange(newValue);
  };  

  return (
    <FormControlLabel
      control={
        <Switch
          checked={inputValue}
          onChange={handleChange}
          color="primary"
          size="small" 
        />
      }
      style={{margin:'2px'}}
      label={<span style={{fontSize:'0.9rem'}}>{label}</span>}
    />

  )
}
