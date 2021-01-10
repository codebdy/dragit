import { Paper } from '@material-ui/core';
import React from 'react';

const ListView = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  
  return (
    <Paper {...rest}  ref={ref}>
      {children}
    </Paper>
  );
})

export default ListView;

