import { TableContainer, Table, TableBody, TableRow } from '@material-ui/core';
import { ComponentRender } from 'Base/ComponentRender';
import { IMeta } from 'Base/Model/IMeta';
import { ModelProvider } from 'Base/ModelTree/ModelProvider';
import { RXNode } from 'Base/RXNode/RXNode';
import { useDesign } from 'Design/PageEditor/useDesign';
import React, { Fragment } from 'react';
import { useListViewStore } from '../ListViewStore';
import { ListViewBodyHead } from './ListViewBodyHead';
import { ListViewBodyTable } from './ListViewBodyTable';

const ListViewBody = React.forwardRef((
    props:{
      childrenNodes?:Array<RXNode<IMeta>>,
      children?:any,
    }, 
    ref:any
  )=>{

  const {
    childrenNodes,
    children,
    ...rest
  } = props
  const {isDesigning} = useDesign(); 
  const listViewStore = useListViewStore();
 
  return (
    <TableContainer {...rest}  ref={ref}>
      <Table style={{display:'none'}}>
        <TableBody>
          <TableRow>
            <ModelProvider value={listViewStore.rowSchemaStore}>
              {
                childrenNodes?.map((column, colIndex) => {
                  return(
                    <ComponentRender key={colIndex} node = {column} />
                  )
                })
              }
              </ModelProvider>
            </TableRow>
        </TableBody>
      </Table>
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
              <ListViewBodyHead columns = {childrenNodes||[]}/>
              <ListViewBodyTable columns = {childrenNodes||[]}/>
            </Fragment>           
        }
      </Table>
    </TableContainer>
  );
})

export default ListViewBody;

