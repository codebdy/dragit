import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';
import { InputProps } from './InputProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input:{
      background:'#41474c', 
      outline:'0', 
      border:'1px', 
      color:'#cdcfd0', 
      borderRadius:'3px', 
      padding:'4px',
      '&:focus':{
        border:'#0a6fb7 solid 1px'
      }
    }

  }),
);


export default function NumberInput(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange, schema} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInputValue(event.target.value as string);
    onChange(field, event.target.value as string);
  };  

  return (
    <input type="number"
      min={schema.min}
      max={schema.max}
      step={schema.step}
      className={classes.input}
      value={inputValue}
      onChange={handleChange}
    />
  )
}
