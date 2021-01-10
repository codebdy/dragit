import React from 'react';
import { RXInputProps } from 'base1/RXInputProps';
import withSkeleton from 'base1/HOCs/withSkeleton';
import withFormField from 'components1/common/withFormField';
import { useDesign } from 'design1/PageEditor/useDesign';

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