import { Skeleton } from '@material-ui/lab';
import React from 'react';

const withSkeleton = (Component:any)=>{
  const WithSkeleton = (props:any)=>{
    const {loading, forwardedRef, ...rest} = props
    return (
      loading ? 
      <Skeleton ref={forwardedRef} animation="wave" height={50} width="80%" /> 
      :
      <Component {...rest}  ref={forwardedRef} /> 
    )
  }

  return React.forwardRef((props, ref) => {
    return <WithSkeleton {...props} forwardedRef={ref} />;
  });
}

export default withSkeleton