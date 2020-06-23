import React from 'react';
import { Grid } from '@material-ui/core';


const FormGridItem = React.forwardRef((props:{children:any}, ref:any) => {
  return (
    <Grid item>
      {props.children}
    </Grid>
  )
});
export default FormGridItem