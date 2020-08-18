import React from 'react';
import { makeStyles, Theme, createStyles, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    optionSelect: {

    },

  }),
);

export default function OptionSelect(){
  //const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };  
  return (
    <Select
      value={age}
      onChange={handleChange}
    >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  )
}
