import React from 'react';
import { Grid } from '@material-ui/core';
import FormField from '../FormField';
import classNames from 'classnames';

type size = boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
interface FormGridItemProps{
  children:any;
  as:string;
  xs:size;
  sm:size;
  md:size;
  lg:size;
  xl:size;
  style:any;
  editStyle:any;
  className:any;
  editClassName:any;
}

const FormGridItem = React.forwardRef((props:FormGridItemProps, ref:any) => {
  const{children, xs, sm, md, lg, xl, style, className, editStyle, editClassName, ...rest} = props
  return (
    <Grid item  xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <FormField {...rest} fullWidth={true} ref={ref} style={{...style, ...editStyle}} className = {classNames(className, editClassName)}>
        {children}        
      </FormField>

    </Grid>
  )
});
export default FormGridItem