import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

var idSeed = 1;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
    },

  }),
);

const SelectInput = React.forwardRef((
  props:{
    value?:string|[],
    label?:string,
    variant?:string,
    multiple?:boolean,
    helperText?:string,
    onChange:any,
    inputRef?:any,
  },
  ref
)=>{
  const{value, label, variant, multiple, helperText, onChange, inputRef, ...rest} = props;
  const classes = useStyles();
  const [id] = React.useState(idSeed++);

  const empertyValue = multiple?[]:'';
  //console.log(props);
  return (
    <FormControl variant={variant as any} className={classes.root} {...rest}>
      <InputLabel id={`label-${id}`} >{label}</InputLabel>
      <Select
        labelId={`label-${id}`}
        id={`select-input-${id}`}
        multiple = {multiple}
        value={value || empertyValue}
        onChange={onChange}
        label={label}
      >
        <MenuItem value={empertyValue}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
      
    </FormControl>
  )
})

export default SelectInput