import React from 'react';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'inline',
    },
  }),
);


const TextView = React.forwardRef((
  props: RXInputProps& {
    fullWidth?:boolean,
    value?:Array<any>,   
    children?:any,
    //style?:any,
    withHeader:boolean,
    error?:any,
    helperText?:string,
    isDeisgning?:boolean,
  },
  ref:any
)=>{
  const {fullWidth, name, loading, value, error, helperText, children, onChange, isDeisgning, ...rest} = props;

  const classes = useStyles();

  return (
    <div 
      className = {classes.root}
      ref={ref}
      {...rest}
    >
      {isDeisgning ? `field:${name}` : value}
    </div>
  )
})

export default withFormField(withSkeleton(TextView))