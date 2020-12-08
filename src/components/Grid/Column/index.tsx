import React from 'react';
import { Grid } from '@material-ui/core';

const GridColumn = React.forwardRef((props:any, ref:any) => {
  const{children, ...rest} = props
  return (
    <Grid item {...rest} ref={ref}>
      {children}        
    </Grid>
  )
});

export default GridColumn