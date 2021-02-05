import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid} from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';
import intl from "react-intl-universal";

export interface SelectItem{
  value:string|number;
  label:string;
  localLabelKey?:string;
}

export default function OptionSelect(props:PropsInputProps&{
  items?:Array<{value:string, label:string}>,
}){
  const {label, value, onChange, items, xs=6, ...rest} = props;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value || undefined);
  };  

  return (
    <Grid item xs = {xs}>
      <FormControl variant="outlined" size="small" fullWidth {...rest}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value === undefined ? '' : value }
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
    </Grid>
  )
}
