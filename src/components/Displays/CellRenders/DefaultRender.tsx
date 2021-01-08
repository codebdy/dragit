import React from 'react';
import { Fragment } from 'react';

export const DefaultRender = React.forwardRef((
  props:{value:string},
  ref:any
) =>{
  const {value} = props;
  return(
    <Fragment>{value}</Fragment>
  )
})