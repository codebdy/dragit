import React from 'react';

const ListViewBody = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  
 
  return (
    <div {...rest}  ref={ref}>
      ListView body
    </div>
  );
})

export default ListViewBody;

