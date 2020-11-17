
import React, { Fragment } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, makeStyles, Theme, Fab } from '@material-ui/core';
import intl from 'react-intl-universal';
import ModulePageRow, { PageMeta } from './ModulePageRow';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      widht: '100%',
    },
    addArea:{
      width:'100%',
      position:'relative',
    },
    fab:{
      position:'absolute',
      right:'20%',
      top:theme.spacing(-3),
    }

  }),
);

export default function ModulePageTable(
  props:{
    pages:PageMeta[],
    indexPageId:number,
    onChangePage:(newPage:PageMeta)=>void,
    onRemovePage:(id:number)=>void,
    onAddPage:()=>void,
  }
){
  const classes = useStyles();
  const {pages, indexPageId, onChangePage, onRemovePage, onAddPage} = props;

  const handleRemove = (id:number)=>{
    onRemovePage(id);
  }

  const handleAdd = ()=>{
    onAddPage();
  }

  return(
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="modules table">
          <TableHead>
            <TableRow>
              <TableCell><b>{intl.get('title')}</b></TableCell>
              <TableCell><b>API</b></TableCell>
              <TableCell style={{width:'80px'}}><b>{intl.get('is-form-page')}</b></TableCell>
              <TableCell style={{width:'80px'}}><b>{intl.get('is-index-page')}</b></TableCell>
              <TableCell style={{width:'120px'}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              pages?.map((page) => (
                <ModulePageRow 
                  key={page.id} 
                  page={page} 
                  isIndexPage={indexPageId === page.id} 
                  onChangePage = {onChangePage}
                  onRemove = {handleRemove}
                />
              ))
              }
    
          </TableBody>
        
        </Table>

      </TableContainer>
      <div className = {classes.addArea}>
        <Fab color="primary" 
          className={classes.fab} 
          size="medium"
          onClick = {handleAdd}
        >
          <Add />
        </Fab>  
      </div>    
    </Fragment>
  )
}