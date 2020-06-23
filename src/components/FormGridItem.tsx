import React from 'react';
import { Grid } from '@material-ui/core';


const FormGridItem = React.forwardRef((props:{children:any, className:string}, ref:any) => {
  return (
    <Grid item {...props} ref={ref}>
      {props.children}
    </Grid>
  )
});
export default FormGridItem