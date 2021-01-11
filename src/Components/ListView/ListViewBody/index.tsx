import { TableContainer, Table } from '@material-ui/core';
import { useDesign } from 'Design/PageEditor/useDesign';
import React from 'react';
import { ListViewHead } from './ListViewHead';

const ListViewBody = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    childrenNodes,
    children,
    ...rest
  } = props
  const {isDesigning} = useDesign(); 
 
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
          ? children
          : <ListViewHead columns = {childrenNodes}/>
        }
      </Table>
    </TableContainer>
  );
})

export default ListViewBody;

