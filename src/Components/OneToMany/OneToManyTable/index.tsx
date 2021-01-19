import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import MultiContentPotlet from 'Components/Common/MultiContentPotlet';
import { useModelStore } from 'Base/ModelTree/ModelProvider';

import { Observer } from 'mobx-react';
import { Fragment } from 'react';
import { useDesign } from 'Design/PageEditor/useDesign';
import { IMeta } from 'Base/Model/IMeta';
import { RXNode } from 'Base/RXNode/RXNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
    },
  }),
);


const OneToManyTable = React.forwardRef((
  props: {
    rxNode:RXNode<IMeta>,
    field?:string,
    size?:any,
    children:any,
  }, 
  ref:any
)=>{
  const{
    rxNode,
    field,
    size,
    children,
     ...rest
  } = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getChild(field);
  useEffect(()=>{
    if(field){
      //modelStore?.setChild(field,  new RXNode(rxNode));      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  const handleAddNew = ()=>{
    if(isDesigning){
      return;
    }
    //fieldStore?.addRow();
  }

  const handelRemove = (index:number)=>{
    //fieldStore?.removeRow(index);
  }

  return (
    <Observer>{()=>
      <MultiContentPotlet 
        ref={ref}
        onAddNew = {handleAddNew}
        {...rest}
      >
          <Table className={classes.table} size={size}>
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
                  {/*fieldStore?.rows.map((rowStore, rowIndex) => (
                    <ModelProvider value={rowStore} key = {rowStore.id}>
                      <TableRow key={`row-${rowStore.id}`} >
                        {
                          rxNode?.children.map((column, index)=>{
                            return(
                              <ComponentRender key={`${index}-row-${rowStore.id}`} node = {column} />
                            )
                          })
                        }
                        <TableCell align="right">
                          <IconButton aria-label="delete"
                            onClick = {(event) => {handelRemove(rowIndex)}}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </ModelProvider>
                      ))*/}
                </TableBody>
              </Fragment>
            }
          </Table>    
      </MultiContentPotlet>
    }
    </Observer>
  )
})

export default OneToManyTable;
