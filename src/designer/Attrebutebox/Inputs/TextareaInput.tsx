import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';
import { InputProps } from './InputProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input:{
      background:'rgba(255,255,255,0.15)', 
      outline:'0', 
      border:'1px', 
      color:'#cdcfd0', 
      borderRadius:'3px', 
      marginTop:'8px',
      '&:focus':{
        border:'#0a6fb7 solid 1px'
      },
      width:'100%',
    }

  }),
);

export default function TextareaInput(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    setInputValue(newValue);
    onChange(field, newValue ||' ');
  };  

  return (
    <textarea value={inputValue || ''} onChange = {handleChange} className={classes.input}></textarea>
  )
}
