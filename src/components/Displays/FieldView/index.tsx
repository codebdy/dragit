import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { RXInputProps } from 'base/RXInputProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width:'100%',
    },
  }),
);

const FieldView = React.forwardRef((
  props: RXInputProps& {
    fullWidth?:boolean,
    value?:Array<any>,   
    children?:any,
    //style?:any,
    withHeader:boolean,
    error?:any,
    helperText?:string,
  },
  ref:any
)=>{
  const {fullWidth, name, loading, value, error, helperText, children, onChange, ...rest} = props;
  const classes = useStyles();

  return (
    <div 
      ref={ref}
      className = {fullWidth ? classes.fullWidth : ''}
      {...rest}
    >
      {value}
    </div>
  )
})

export default FieldView