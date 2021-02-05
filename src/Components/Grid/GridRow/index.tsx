import React from 'react';
import { Grid } from '@material-ui/core';

const GridRow = React.forwardRef((props:any, ref:any) => {
  const{spacing, children, ...rest} = props
  return (
    <Grid container spacing = {spacing||0} {...rest} ref={ref}>
      {children}        
    </Grid>
  )
});

export default GridRow