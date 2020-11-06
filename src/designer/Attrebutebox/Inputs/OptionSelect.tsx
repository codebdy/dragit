import React from 'react';
import { Select, MenuItem, FormControl} from '@material-ui/core';
import { InputProps } from './InputProps';

export default function OptionSelect(props:InputProps){
  //const classes = useStyles();
  const {field, value, onChange, schema} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputValue(event.target.value);
    onChange(field, event.target.value);
  };  
  return (
    <FormControl variant="outlined" size="small">
      <Select
        value={inputValue || ''}
        onChange={handleChange}
      >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {
        schema && Object.keys(schema).map((itemKey:string)=>{
          return (
          <MenuItem key={itemKey} value={schema[itemKey]}>{itemKey}</MenuItem>
          )
        })
      }
    </Select>
    </FormControl>
  )
}
