import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input:{
      background:'rgba(255,255,255,0.15)', 
      outline:'0', 
      border:'1px', 
      color:'#cdcfd0', 
      borderRadius:'3px', 
      padding:'4px',
      '&:focus':{
        border:'#0a6fb7 solid 1px'
      },
      width:'100%',
    }

  }),
);

const StyledTextInput = (props:any) => {
  const classes = useStyles();
  return (
    <input 
      className={classes.input}
      {...props}
    />
  )
}

const  StyledTextAreaInput = (props:any)=>{
  const classes = useStyles();
  return (
    <textarea 
      className={classes.input}
      {...props}
  ></textarea>
  )
}

export {StyledTextInput, StyledTextAreaInput}