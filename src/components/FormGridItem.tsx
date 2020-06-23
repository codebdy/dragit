import React from 'react';
import { Grid } from '@material-ui/core';


const FormGridItem = React.forwardRef((props:{children:any, className:string}, ref:any) => {
  const{children, ...rest} = props
  return (
    <Grid item {...rest} ref={ref}>
      {children}
    </Grid>
  )
});
export default FormGridItem