
import React, { Fragment } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, makeStyles, Theme, Fab } from '@material-ui/core';
import intl from 'react-intl-universal';
import ModulePageRow from './ModulePageRow';
import { Add } from '@material-ui/icons';
import { IPage } from 'base/Model/IPage';

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
      right:'120px',
      top:theme.spacing(-3),
    }

  }),
);

export default function ModulePageTable(
  props:{
    pages:IPage[],
    entry_page_id:number,
    onChangePage:(newPage:IPage)=>void,
    onRemovePage:(id:number)=>void,
    onAddPage:()=>void,
    onChangeIndexPage : (pageId:number, indexed:boolean)=>void,
    onDesign: (page:IPage)=>void,
  }
){
  const {pages, entry_page_id, onChangePage, onRemovePage, onAddPage, onChangeIndexPage, onDesign} = props;
  const classes = useStyles();
  
  const handleRemove = (id:number)=>{
    onRemovePage(id);
  }

  const handleAdd = ()=>{
    onAddPage();
  }

  return(
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="modules table" size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>{intl.get('slug')}</b></TableCell>
              <TableCell><b>{intl.get('title')}</b></TableCell>
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
                  isIndexPage={entry_page_id === page.id} 
                  onChangePage = {onChangePage}
                  onRemove = {handleRemove}
                  onChangeIndexPage = {(indexed)=>{
                    onChangeIndexPage(page.id, indexed);
                  }}

                  onDesign = {()=>onDesign(page)}
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