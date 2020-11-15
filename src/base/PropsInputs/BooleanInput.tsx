import React from 'react';
import { Switch} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';

export default function BooleanInput(props:PropsInputProps){
  const {field, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(!!value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
    setInputValue(newValue);
    onChange(field, newValue);
  };  

  return (
    <Switch
      checked={inputValue}
      onChange={handleChange}
      color="primary"
    />
  )
}
