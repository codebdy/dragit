import React from 'react';
import { RXInputProps } from 'base1/RXInputProps';
import withSkeleton from 'base1/HOCs/withSkeleton';
import withFormField from 'components1/common/withFormField';
import dayjs from 'dayjs';
import { useDesign } from 'design1/PageEditor/useDesign';

const DayView = React.forwardRef((
  props: RXInputProps& {
    format?:string,
    display?:'inline'|'block',
    style?:any,
  },
  ref:any
)=>{
  const {name, loading, value, error, helperText, onChange, format = 'YYYY-MM-DD HH:mm:ss', display = 'inline', style, ...rest} = props;
  const {isDesigning} = useDesign();
  
  const renderValue = value? dayjs(value).format(format):''; 
  return (
    <div 
      ref={ref}
      style={{...style, display:display}}
      {...rest}
    >
      {isDesigning ? `field:${name}` : renderValue}
    </div>
  )
})

export default withFormField(withSkeleton(DayView))