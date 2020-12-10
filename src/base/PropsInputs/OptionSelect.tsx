import React, { useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';
import intl from "react-intl-universal";

export interface SelectItem{
  value:string|number;
  label:string;
  localLabelKey?:string;
}

export default function OptionSelect(props:PropsInputProps){
  //const classes = useStyles();
  const {label, value, onChange} = props;
  const items = props.props?.items;
  const [inputValue, setInputValue] = React.useState(value);

  useEffect(()=>{
    setInputValue(value);
  },[value])
  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };  
  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={inputValue || ''}
        onChange={handleChange}
        label = {label}
      >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {
        items?.map((item:SelectItem)=>{
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.localLabelKey ? intl.get(item.localLabelKey) : item.label}
            </MenuItem>
          )
        })
      }
    </Select>
    </FormControl>
  )
}
