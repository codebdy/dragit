import React from 'react';
import { makeStyles, Theme, createStyles, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    optionSelect: {

    },

  }),
);

export interface InputProps{
  field:string;
  value:any;
  onChange:any;
  schema?:any;
}

export default function OptionSelect(props:InputProps){
  //const classes = useStyles();
  const {field, value, onChange, schema} = props;
  const [age, setAge] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
    onChange(field, event.target.value as string);
  };  
  return (
    <Select
      value={age}
      onChange={handleChange}
    >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    {
      schema && Object.keys(schema).map((itemKey:string)=>{
        return (
        <MenuItem value={itemKey}>{schema[itemKey]}</MenuItem>
        )
      })
    }
  </Select>
  )
}
