import { Skeleton } from '@material-ui/lab';
import { RXInputProps } from 'base/RXInputProps';
import React from 'react';

const InputWithSkeleton = React.forwardRef((props:{as:any}&RXInputProps, ref:any) => {
  const {loading, as, ...rest} = props
  const InputControl = as;
  return (
    loading ? 
    <Skeleton animation="wave" height={50} width="80%" /> 
    :
    <InputControl {...rest} ref = {ref} /> 
  )
});

export default InputWithSkeleton