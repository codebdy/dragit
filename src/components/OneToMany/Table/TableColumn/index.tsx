import { TableCell } from '@material-ui/core';
import React from 'react';

const TableColumn = React.forwardRef((props:any, ref:any)=>{
  const {children, ...rest} = props;

  return (
    <TableCell {...rest} ref={ref}> 
      {children}
    </TableCell> 
  )
})

export default TableColumn;