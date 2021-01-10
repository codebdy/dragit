import React from 'react';

const ListViewToolbar = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    chlidren,
    ...rest
  } = props
  
 
  return (
    <div {...rest}  ref={ref}>
      ListView Toolbar
    </div>
  );
})

export default ListViewToolbar;

