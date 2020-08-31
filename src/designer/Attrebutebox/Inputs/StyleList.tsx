import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';
import { InputProps } from './InputProps';
import { AttributeRow, RowLabel, RowValue } from '../AttributeRow';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      background:'rgba(0,0,0,0.3)',
      padding:'5px',
      borderRadius:'3px',
    },
    row:{
      display:'flex',
      flexFlow:'row',
      padding:'3px',
    },
    input:{
      background:'transparent',
      border:'0',
      outline:'0',
      color:'#fff',
    },
    leftInput:{
      width:'80px',
    },
    rightInput:{
      width:'100px',
    },
    clearButton:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      background: 'hsla(0,0%,100%,.1)',
      paddingBottom:'2px',
      borderRadius: '3px',
      margin: '1px',
      cursor: 'pointer',
    }

  }),
);


export default function StyleList(){
  const classes = useStyles();
  //const {field, value, onChange, schema} = props;
  //const [inputValue, setInputValue] = React.useState(value);

  ///const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //  setInputValue(event.target.value as string);
  //  onChange(field, event.target.value as string);
  //};  

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <input className = { classNames(classes.input, classes.leftInput) } />
        :
        <input className = {classNames(classes.input, classes.rightInput)} />
        <div className = {classes.clearButton}>x</div>
      </div>
      <div className={classes.row}>
        <input className = { classNames(classes.input, classes.leftInput) } />
        :
        <input className = {classNames(classes.input, classes.rightInput)} />
        <div className = {classes.clearButton}>x</div>
      </div>
    </div>
    
  )
}
