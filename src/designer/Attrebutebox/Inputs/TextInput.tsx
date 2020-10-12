import React from 'react';
import { InputProps } from './InputProps';
import StyledTextInput from './StyledTextInput';

export default function TextInput(props:InputProps){
  const {field, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue(newValue);
    onChange(field, newValue);
  };  

  return (
    <StyledTextInput 
      value={inputValue||''}
      onChange={handleChange}
    />
  )
}
