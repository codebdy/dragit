import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import { ListViewHead } from './ListViewHead';
import ListViewToolbar from './ListViewToolbar';
import { ListViewMetaItem } from './ListViewMetaItem';
import intl from 'react-intl-universal';
import { JUMP_TO_PAGE_ACTION, PageActionHandle } from 'admin/views/Page/PageAction';
import { AxiosRequestConfig } from 'axios';
import { Skeleton } from '@material-ui/lab';
import { Tooltip, IconButton } from '@material-ui/core';
import MdiIcon from '../common/MdiIcon';
import HoverablePaper from 'components/common/HoverablePaper';
import { IPageJumper } from 'base/Model/IPageJumper';
import { IOperateListParam } from 'base/Model/IOperateListParam';
import { IPaginate } from 'base/Model/IPaginate';
import { ListViewCell } from './ListViewCell';
import { useAxios } from 'base/Hooks/useAxios';

export const COMMAND_QUERY = "query";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },

  }),
);

export interface Row{
  id:any,
  [key:string]:any,
}

export interface Paginate{
  total:number,
  per_page:number,
  current_page:number,
  last_page:number,
  from:number,
  to:number,
  data:Array<unknown>,
}

export interface ListViewForm{
  page:number,
  rowsPerPage:number,
  keyword:string,
  filters:Array<string>,
  sortBy:Array<string>
}

function creatEmpertyRows(length:number){
  let rows = []
  for(var i = 0; i < length; i++){
    rows.push({id:i+1});
  }

  return rows;
}

const ListView = React.forwardRef((
    props: {
      className:string, 
      value?:Paginate, 
      columns:Array<ListViewMetaItem>, 
      filters:Array<ListViewMetaItem>,
      batchCommands:Array<ListViewMetaItem>,
      rowCommands:Array<ListViewMetaItem>,
      rowsPerPageOptions:string,
      defalutRowsPerPage:number,
      onAction: PageActionHandle,
      bind:AxiosRequestConfig,
      elevation:number,
    }, 
    ref:any
  )=>{

  const {
    className, 
    //value, 
    columns, 
    filters, 
    rowCommands, 
    batchCommands, 
    rowsPerPageOptions = "10,25,50", 
    defalutRowsPerPage = 10,
    onAction,
    bind,
    elevation,
    ...rest
  } = props
  
  const classes = useStyles();
  const [operateParam, setOperateParam] = useState<IOperateListParam>({
    page : 0,
    rowsPerPage: defalutRowsPerPage,
  });

  const [request, setRequest] = useState<AxiosRequestConfig>();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [paginate = {
    total:0,
    perPage:10,
    currentPage:0,
    data:[],
  }, loading] = useAxios<IPaginate>(request, showSuccessAlert);

  useEffect(()=>{
    setRequest({...bind, data:{...bind.data, operateParam}})
  }, [bind, operateParam])

  const updateOperateParam = (field:string, value:any, showAlert = false)=>{
    setShowSuccessAlert(showAlert);
    setOperateParam({...operateParam, [field]:value, selected:[...selected]});
    setSelected([]);
  }

  const [selected, setSelected] = React.useState<number[]>([]);
  const rows = loading ? creatEmpertyRows(paginate.perPage) : paginate.data;

  const parseRowsPerPageOptions = ()=>{
    let ret: number[] = [];
    rowsPerPageOptions?.replace('，',',').split(',').forEach(i=>{
      ret.push(parseInt(i));
    })
    return ret;
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n:Row) => n.id);
      setSelected(newSelecteds||[]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const jumpToPage = (pageParams:IPageJumper, row:any)=>{
    onAction({name:JUMP_TO_PAGE_ACTION, page:{...pageParams, dataId:row.id}})
  }


  const handleBatchAction = (commandSlug:string)=>{
    updateOperateParam('command', commandSlug, true);
  }
  const handleRowAction = (commandSlug:string, rowId:string)=>{
    updateOperateParam('command', commandSlug, true);
    updateOperateParam('selected', [rowId], true);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateOperateParam('rowsPerPage', parseInt(event.target.value, 10));
  };

  const hasRowCommands = rowCommands && rowCommands.length > 0;
  

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classNames(classes.root, className)} {...rest} ref={ref}>
      <HoverablePaper elevation = {elevation}>
        <ListViewToolbar
          keyword = {operateParam.keywords}
          numSelected={selected.length}
          filters = {filters}
          batchCommands = {batchCommands}
          filterValues = {operateParam.filterValues}
          onFilterChange = {values=>updateOperateParam('filterValues', values)}
          onKeywordChange = {keywords =>updateOperateParam('keywords', keywords)}
          onBatchAction = {handleBatchAction}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <ListViewHead
              numSelected={selected.length}
              orders = {operateParam.orders}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={orders=>updateOperateParam('orders', orders)}
              rowCount={rows?.length || 0}
              columns = {columns}
              loading = {loading}
              hasRowCommands = {hasRowCommands}
            />
            <TableBody>
              {rows?.map((row:Row, index: any) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `listview-${index}`;
                  return (
                    <TableRow
                      hover
                      id={row.id}
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {
                          loading ? 
                          <Skeleton animation="wave" height={50} width="60%" />
                          :
                          <Checkbox
                            id = {row.id.toString()}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        }
                      </TableCell>
                      {
                        columns.map((column, colIndex) => {
                          return(
                            loading ? 
                            <TableCell key={row.id + '-' + colIndex + '-' + column.field} {... column.props} >
                              <Skeleton animation="wave" height={50} width="50%" />
                            </TableCell>
                            :
                            <ListViewCell
                              key = {row.id + '-' + colIndex + '-' + column.field} 
                              row={row} 
                              columns = {columns} 
                              colIndex = {colIndex} 
                            />
                          )
                        })
                      }
                      {
                        hasRowCommands&&
                        (
                          loading ? 
                            <TableCell key={row.id + '-command'} align="right">
                              <Skeleton animation="wave" height={50} width="50%" />
                            </TableCell>
                          :
                            <TableCell key={row.id + '-command'} align="right">
                              {
                                rowCommands?.map((command, index)=>{
                                  return(
                                    <Tooltip title={command.label} key={command.slug}>
                                      <IconButton aria-label={command.label} name={'batch-action-' + command.slug}
                                        onClick = {(e)=>{
                                          command.jumpToPage ? jumpToPage(command.jumpToPage as IPageJumper, row) : handleRowAction(command.slug, row.id);
                                          e.stopPropagation();
                                        }}
                                        size = "small"
                                      >
                                        <MdiIcon iconClass = {command.icon} size="16" />
                                      </IconButton>
                                    </Tooltip>
                                  )
                                })
                              }                              
                            </TableCell>
                        )
                      }
                    </TableRow>
                  );
                })}
              {/*emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )*/}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={parseRowsPerPageOptions()}
          component="div"
          labelRowsPerPage = {intl.get('rows-per-page') + ':'}
          count={paginate.total}
          rowsPerPage={paginate.perPage}
          page={paginate.currentPage}
          onChangePage={(event, newPage)=>updateOperateParam('page', newPage)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
          }}
        />
      </HoverablePaper>
    </div>
  );
})

export default ListView;

