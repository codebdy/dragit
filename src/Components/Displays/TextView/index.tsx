import React from 'react';
import { RXInputProps } from 'Base/RXInputProps';
import withSkeleton from 'Base/HOCs/withSkeleton';
import withFormField from 'Components/utils/withFormField';
import { useDesign } from 'rx-drag/store/useDesign';

const TextView = React.forwardRef((
  props: RXInputProps& {
    display?:'inline'|'block',
    style?:any,
  },
  ref:any
)=>{
  const {name, loading, value, error, helperText, onChange, display = 'inline', style, ...rest} = props;
  const {isDesigning} = useDesign();

  return (
    <div 
      ref={ref}
      style={{...style, display:display}}
      {...rest}
    >
      {isDesigning ? `field:${name}` : value}
    </div>
  )
})

export default withFormField(withSkeleton(TextView))