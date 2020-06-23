import React from 'react';
import { resolveNode } from 'components/resoveNode';

const FormField = React.forwardRef((props:{as:string}, ref:any) => {
  const {as, ...rest} = props
  const InputControl = resolveNode(as);
  return (
    <InputControl 
      {...rest} 
      ref={ref}
    />
  )
});

export default FormField