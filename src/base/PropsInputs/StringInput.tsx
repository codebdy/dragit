import React from 'react';
import { TextField } from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function StringInput(props:PropsInputProps){
  const {field, label, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue(newValue);
    onChange(field, newValue);
  };  

  return (
    <TextField
      label={label}
      value={inputValue||''}
      onChange={handleChange}
      size="small"
      fullWidth
      variant = "outlined"
      {...props.props}
    />
  )
}
