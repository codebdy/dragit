import React from 'react';
import { RXInputProps } from 'Base/RXInputProps';
import withSkeleton from 'Base/HOCs/withSkeleton';
import withFormField from 'Components/utils/withFormField';
import dayjs from 'dayjs';
import { useDesign } from 'rx-drag/store/useDesign';

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