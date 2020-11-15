import React from 'react';
import { TextField } from '@material-ui/core';
import { RXInputProps } from 'base/RXInputProps';
import InputWithSkeleton from 'components/common/InputWithSkeleton';

const TextBox = React.forwardRef((props:RXInputProps, ref:any) => {
  return (
    <InputWithSkeleton as={TextField} {...props} ref={ref}/>
  )
});

export default TextBox