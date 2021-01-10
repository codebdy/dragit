import React from 'react';

import ListViewInner from './ListViewBody/ListViewInner';

const ListView = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    className, 
    style,
    ...rest
  } = props
  
 
  return (
    <div className={className} style={{...style}}  ref={ref}>
      <ListViewInner {...rest} />
    </div>
  );
})

export default ListView;

