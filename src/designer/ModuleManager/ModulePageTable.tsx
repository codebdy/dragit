
import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, makeStyles, Theme } from '@material-ui/core';
import intl from 'react-intl-universal';
import ModulePageRow, { PageMeta } from './ModulePageRow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      widht: '100%',
    },

  }),
);

export default function ModulePageTable(
  props:{
    pages:PageMeta[],
    indexPageId:number,
    onChangePage:(newPage:PageMeta)=>void,
    onRemovePage:(id:number)=>void,
  }
){
  const classes = useStyles();
  const {indexPageId, onChangePage, onRemovePage} = props;
  const [pages, setPages] = React.useState(props.pages)

  const handleRemove = (id:number)=>{
    onRemovePage(id);
    setPages(pages.filter(page=>{return id !== page.id}));
  }

  return(
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
  )
}