import React from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import MultiContentPotlet from 'Components/utils/MultiContentPotlet';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';

import { Observer } from 'mobx-react';
import { Fragment } from 'react';
import { useDesign } from 'rx-drag/store/useDesign';
import { IMeta } from 'Base/RXNode/IMeta';
import { DADA_RXID_CONST, RxNode } from 'rx-drag/models/RxNode';
import { useSetTableStore } from '../useSetTableStore';
import { ComponentRender } from 'Base/PageUtils/ComponentRender';
import { Close } from '@material-ui/icons';
import { ID } from 'rx-drag/models/baseTypes';
import { makeTableRowModel } from 'Base/ModelTree/makeTableModel';
import {observer} from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
    },
  }),
);


const OneToManyTable = observer(React.forwardRef((
  props: {
    rxNode:RxNode<IMeta>,
    size?:any,
    children:any,
  }, 
  ref:any
)=>{
  const{
    rxNode,
    size,
    children,
     ...rest
  } = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getChild(rxNode?.meta.field);
  
  useSetTableStore(rxNode, 'OneToManyTableRow');

  const handleAddNew = ()=>{
    if(isDesigning){
      return;
    }
    makeTableRowModel(fieldStore?.value,  fieldStore, rxNode, 'OneToManyTableRow')
  }

  const handelRemove = (id:ID)=>{
    fieldStore?.removeChildStore(id);
  }

  return (
    <Observer>{()=>
      <MultiContentPotlet 
        ref={ref}
        onAddNew = {handleAddNew}
        {...rest}
      >
          <Table className={classes.table} size={size} {...{[DADA_RXID_CONST]:fieldStore?.node?.rxid}}>
            {
              isDesigning?
              <TableBody>
                <TableRow>
                  {children}
                </TableRow>
              </TableBody>
              :
              <Fragment>
                <TableHead>
                  <TableRow>
                    {
                      rxNode?.children.map((column, index)=>{
                        const{width = undefined, ...other} = (column.meta.props ? column.meta.props : {})
                        return(
                          <TableCell key={`${column}-${index}`} component="th" style={{width:width}} {...other}>
                            <b>
                              {column.meta.props?.label}
                            </b>
                          </TableCell>
                        )
                      })
                    }
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fieldStore?.getChildren()?.map((rowStore) => (
                    <ModelProvider value={rowStore} key = {rowStore.id}>
                      <TableRow key={`row-${rowStore.id}`} {...{[DADA_RXID_CONST]:rowStore?.node?.rxid}}>
                        {
                          rxNode?.children.map((column)=>{
                            return(
                              <ComponentRender key={`${column?.id}-${rowStore.id}`} node = {column} />
                            )
                          })
                        }
                        <TableCell align="right">
                          <IconButton aria-label="delete"
                            onClick = {(event) => {handelRemove(rowStore.id)}}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </ModelProvider>
                      ))}
                </TableBody>
              </Fragment>
            }
          </Table>    
      </MultiContentPotlet>
    }
    </Observer>
  )
}))

export default OneToManyTable;
