import { TableContainer, Table, TableBody, TableRow } from '@material-ui/core';
import ComponentRender from 'Base/ComponentRender';
import { IMeta } from 'Base/Model/IMeta';
import { ModelProvider } from 'Base/ModelTree/ModelProvider';
import { RXNode } from 'Base/RXNode/RXNode';
import { useDesign } from 'Design/PageEditor/useDesign';
import React from 'react';
import { useListViewStore } from '../ListViewStore';
import { ListViewBodyHead } from './ListViewBodyHead';

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
                    <ComponentRender key={colIndex} component = {column} />
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
          : <ListViewBodyHead columns = {childrenNodes||[]}/>
        }
      </Table>
    </TableContainer>
  );
})

export default ListViewBody;

