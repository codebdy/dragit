import { TablePagination } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useListViewStore } from '../ListViewStore';
import {observer} from 'mobx-react';

const ListViewPagination = observer((
    props:{
      rowsPerPageOptions?:string,
      rowsPerPage?:number,
    }
  )=>{
  const {rowsPerPageOptions, rowsPerPage = 10, ...rest} = props;
  const listViewStore = useListViewStore();
  
  useEffect(()=>{
    listViewStore.paginatorInfo.setPerPage(rowsPerPage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
 
  const parseRowsPerPageOptions = ()=>{
    let ret: number[] = [];
    rowsPerPageOptions?.replace('，',',').split(',').forEach(i=>{
      ret.push(parseInt(i));
    })
    return ret;
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    listViewStore.paginatorInfo.setPerPage(parseInt(event.target.value, rowsPerPage));
    //listViewStore.excuteQuery();
  };

  const hanleChangePage = (newPage:number)=>{
    listViewStore.paginatorInfo.setCurrentPage(newPage);
    //listViewStore.excuteQuery();
  }

  return (
    <TablePagination
      rowsPerPageOptions={parseRowsPerPageOptions()}
      component="div"
      labelRowsPerPage = {intl.get('rows-per-page') + ':'}
      count={listViewStore.paginatorInfo.total}
      rowsPerPage={rowsPerPage}
      page={listViewStore.paginatorInfo.currentPage}
      onChangePage={(event, newPage)=>hanleChangePage(newPage)}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
      }}
      {...rest}
    />
  );
})

export default ListViewPagination;

