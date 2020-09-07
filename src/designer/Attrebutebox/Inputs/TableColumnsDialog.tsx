import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton} from '@material-ui/core';
import { InputProps } from './InputProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    more:{
      width:'24px',

    }

  }),
);

export default function TableColumnsDialog(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    setInputValue(newValue);
    onChange(field, newValue ||' ');
  };  

  return (
    <Fragment>
      <IconButton size="small" className = {classes.more}> ··· </IconButton>
    </Fragment>
    
  )
}
