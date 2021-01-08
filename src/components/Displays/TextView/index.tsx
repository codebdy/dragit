import React from 'react';
import { RXInputProps } from 'base/RXInputProps';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';

const TextView = React.forwardRef((
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

  return (
    <span 
      ref={ref}
      {...rest}
    >
      {value}
    </span>
  )
})

export default withFormField(withSkeleton(TextView))