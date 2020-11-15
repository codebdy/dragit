import React from 'react';
import { TextField} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function NumberInput(props:PropsInputProps){
  const {field, label, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = parseInt(event.target.value as string) 
    setInputValue(newValue);
    onChange(field, newValue);
  };  

  return (
    <TextField
      type="number"
      label={label}
      value={inputValue||props.props?.min}
      onChange={handleChange}
      size="small"
      fullWidth
      variant = "outlined"
      {...props.props}
    />
  )
}
