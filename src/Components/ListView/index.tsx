import { Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { ListViewStore, ListViewStoreProvider } from './ListViewStore';

const ListView = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  
  const [listViewStore] = useState(new ListViewStore())

  return (
    <ListViewStoreProvider value = {listViewStore}>
      <Paper {...rest}  ref={ref}>
        {children}
      </Paper>
    </ListViewStoreProvider>
  );
})

export default ListView;

