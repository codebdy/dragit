import React from 'react';
import { Grid } from '@material-ui/core';
import FormField from './FormField';

type size = boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
interface FormGridItemProps{
  children:any;
  className:string;
  as:string;
  xs:size;
  sm:size;
  md:size;
  lg:size;
  xl:size;
}

const FormGridItem = React.forwardRef((props:FormGridItemProps, ref:any) => {
  const{children, xs, sm, md, lg, xl, ...rest} = props
  return (
    <Grid item  xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <FormField {...rest} fullWidth={true} ref={ref}>
        {children}        
      </FormField>

    </Grid>
  )
});
export default FormGridItem