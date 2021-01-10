import React from 'react';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';
import dayjs from 'dayjs';

const DayView = React.forwardRef((
  props: RXInputProps& {
    isDeisgning?:boolean,
    format?:string,
    display?:'inline'|'block',
    style?:any,
  },
  ref:any
)=>{
  const {name, loading, value, error, helperText, onChange, format = 'YYYY-MM-DD HH:mm:ss', display = 'inline', style, isDeisgning, ...rest} = props;

  const renderValue = value? dayjs(value).format(format):''; 
  return (
    <div 
      ref={ref}
      style={{...style, display:display}}
      {...rest}
    >
      {isDeisgning ? `field:${name}` : renderValue}
    </div>
  )
})

export default withFormField(withSkeleton(DayView))