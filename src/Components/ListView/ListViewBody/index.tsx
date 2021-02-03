import { TableContainer, Table, TableBody, TableRow } from '@material-ui/core';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/models/RxNode';
import { useDesign } from 'rx-drag/store/useDesign';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useListViewStore } from '../ListViewStore';
import { ListViewBodyHead } from './ListViewBodyHead';
import { ListViewBodyTable } from './ListViewBodyTable';

const ListViewBody = React.forwardRef((
    props:{
      rxNode:RxNode<IMeta>,
      children?:any,
    }, 
    ref:any
  )=>{

  const {
    rxNode,
    children,
    ...rest
  } = props
  const {isDesigning} = useDesign();
  const listViewStore = useListViewStore();
  
  useEffect(()=>{
    listViewStore?.setTableRxNode(rxNode);
  },[listViewStore, rxNode])
  

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
              <ListViewBodyTable />
            </Fragment>           
        }
      </Table>
    </TableContainer>
  );
})

export default ListViewBody;

