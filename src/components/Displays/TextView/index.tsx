import React from 'react';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';

const TextView = React.forwardRef((
  props: RXInputProps& {
    isDeisgning?:boolean,
    display?:'inline'|'block',
    style?:any,
  },
  ref:any
)=>{
  const {name, loading, value, error, helperText, onChange, display = 'inline', style, isDeisgning, ...rest} = props;

  return (
    <div 
      ref={ref}
      style={{...style, display:display}}
      {...rest}
    >
      {isDeisgning ? `field:${name}` : value}
    </div>
  )
})

export default withFormField(withSkeleton(TextView))