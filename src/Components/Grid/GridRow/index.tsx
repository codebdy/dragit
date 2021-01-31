import React from 'react';
import { Grid } from '@material-ui/core';

const GridRow = React.forwardRef((props:any, ref:any) => {
  const{children, ...rest} = props
  return (
    <Grid container {...rest} ref={ref}>
      {children}        
    </Grid>
  )
});

export default GridRow