import React from 'react';
import { TextField} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function NumberInput(props:PropsInputProps){
  const {label, value, onChange} = props;
  const {min, max, defaultValue, ...rest} = props.props || {};
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = parseInt(event.target.value as string);
    newValue = min !== undefined && newValue < min ? min : newValue
    newValue = max !== undefined && newValue > max ? max : newValue
    setInputValue(newValue);
    onChange(newValue);
  };  

  return (
    <TextField
      type="number"
      label={label}
      value={inputValue || defaultValue || min || 0}
      onChange={handleChange}
      size="small"
      fullWidth
      variant = "outlined"
      {...rest}
    />
  )
}
