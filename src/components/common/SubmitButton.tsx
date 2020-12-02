import React from 'react';
import { makeStyles, Theme, createStyles, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },  
  }),
);

export default function SubmitButton(
  props:{
    variant:'contained' | 'outlined' | 'text',
    color:'default' | 'inherit' | 'primary' | 'secondary',
    size:'large' | 'medium' | 'small',
    onClick?:()=>void,
    submitting?:boolean,
    children?:any,
  }
){
  const {submitting = false, onClick, children, ...rest} = props;
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        onClick = {onClick} 
        disabled = {submitting}
        {...rest}
      >
        {children}
      </Button>
      {submitting && <CircularProgress color = "primary" size={24} className={classes.buttonProgress} />}
  </div>
  )
}
