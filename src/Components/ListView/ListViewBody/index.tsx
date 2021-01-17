import { TableContainer, Table, TableBody, TableRow } from '@material-ui/core';
import { useRXNode } from 'Base/RXNode/RXNodeProvider';
import { useDesign } from 'Design/PageEditor/useDesign';
import React, { Fragment } from 'react';
import { ListViewBodyHead } from './ListViewBodyHead';
import { ListViewBodyTable } from './ListViewBodyTable';

const ListViewBody = React.forwardRef((
    props:{
      children?:any,
    }, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  const {isDesigning} = useDesign();
  const rxNode = useRXNode();
  
  return (
    <TableContainer {...rest}  ref={ref}>
      <Table
        aria-labelledby="tableTitle"
        size={'medium'}
        aria-label="List View"
        style={{marginTop:'1px'}}
      >
        {
          isDesigning
          ? <TableBody >
              <TableRow> 
                {children} 
              </TableRow>
            </TableBody>
          : <Fragment>
              <ListViewBodyHead columns = {rxNode?.children||[]}/>
              <ListViewBodyTable columns = {rxNode?.children||[]}/>
            </Fragment>           
        }
      </Table>
    </TableContainer>
  );
})

export default ListViewBody;

