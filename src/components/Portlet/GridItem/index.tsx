import React from 'react';
import { Grid } from '@material-ui/core';

const PortletGridItem = React.forwardRef((props:{children:any}, ref:any) => {
  const{children, ...rest} = props
  return (
    <Grid item {...rest} ref={ref}>
      {children}        
    </Grid>
  )
});
export default PortletGridItem