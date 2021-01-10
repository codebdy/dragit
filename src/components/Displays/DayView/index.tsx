import React from 'react';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'inline',
    },
  }),
);


const DayView = React.forwardRef((
  props: RXInputProps& {
    isDeisgning?:boolean,
    format?:string,
  },
  ref:any
)=>{
  const {name, loading, value, error, helperText, onChange, format = 'YYYY-MM-DD HH:mm:ss', isDeisgning, ...rest} = props;

  const classes = useStyles();
  const renderValue = value? dayjs(value).format(format):''; 
  return (
    <div 
      className = {classes.root}
      ref={ref}
      {...rest}
    >
      {isDeisgning ? `field:${name}` : renderValue}
    </div>
  )
})

export default withFormField(withSkeleton(DayView))