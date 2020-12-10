import { TextField } from '@material-ui/core';
import React from 'react';

const TexBox = React.forwardRef((props:any, ref:any)=>{
  const {shrinkLabel, ...rest} = props;
  return (
    <TextField 
      ref={ref}
      {...rest} 
      InputLabelProps = {
        shrinkLabel ? 
        {
          shrink: true,
        } 
        : undefined
      }
    />
  )
})

export default TexBox