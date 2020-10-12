import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import { FieldOrder, ListViewHead } from './ListViewHead';
import ListViewToolbar from './ListViewToolbar';
import { ListViewMetaItem } from './ListViewMetaItem';
import intl from 'react-intl-universal';
import { JUMP_TO_PAGE_ACTION, PageActionHandle, PageJumper } from 'admin/views/Page/PageAction';
import axios from 'axios';
import { Skeleton } from '@material-ui/lab';
import { Tooltip, IconButton } from '@material-ui/core';
import MdiIcon from './common/MdiIcon';
import { openSuccessAlertAction } from 'store/alertbar/actions';
import { useDispatch } from 'react-redux';

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

export interface BindMeta{
  method:"POST"|"GET",
  url:string,
  params:unknown,
}

function creatEmpertyRows(length:number){
  let rows = []
  for(var i = 0; i < length; i++){
    rows.push({id:i+1});
  }

  return rows;
}

const ListViewCell = (props:{row:any, columns:Array<ListViewMetaItem>, colIndex:number})=>{
  const {row, columns, colIndex} = props;
  const column = columns[colIndex]
  const parseTemplate = ()=>{
    let cellValue = column.template;
    columns.forEach((col)=>{
      cellValue = cellValue.replace(`{$${col.field}}`, row[col.field]);
    })
    return cellValue
  }
  return(
    column.template?
    <TableCell {... column.props} 
      dangerouslySetInnerHTML={{__html:parseTemplate()}} >
    </TableCell>
    :
    <TableCell {... column.props}>
      {row[column.field]}
    </TableCell>
  )
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
      bind:BindMeta
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
    ...rest
  } = props
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(parseInt(defalutRowsPerPage.toString()));
  const [paginate, setPaginate] = React.useState<any>({
    page:0,
    data:[],
  });

  const [keyword, setKeyword] = React.useState('');
  const [filterValues, setFilterValues] = React.useState({});
  const [orders, setOrders] = React.useState<Array<FieldOrder>>([])
  const [selected, setSelected] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  //const [successAlert, setSuccessAlert] = React.useState(false);

  const rows = loading ? creatEmpertyRows(rowsPerPage) : paginate.data;

  let realtimePage = page;

  useEffect(() => {
    console.log('ListView useEffect')
    emitAction(COMMAND_QUERY);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[keyword, filterValues, orders, rowsPerPage]);

  const parseRowsPerPageOptions = ()=>{
    let ret: number[] = [];
    rowsPerPageOptions?.replace('，',',').split(',').forEach(i=>{
      ret.push(parseInt(i));
    })
    return ret;
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n:Row) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

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

  const dispatch = useDispatch()

  const emitAction = (command:string, showAlert?:boolean, rowID?:string)=>{
    console.log('ListView提交数据：',command, keyword)
    setSelected([]);
    setLoading(true);
    axios(
      {
        method:"get",
        url:bind.url,
        params:bind.params,
        data:{
          command:command,
          keyword:keyword,
          filterValues:filterValues,
          orders:orders,
          selected:rowID ? [rowID] : selected,
          page:realtimePage,
          pageRows:rowsPerPage,
        }
      }
    ).then(res => {
      setPaginate(res.data);
      setPage(res.data?.page)
      setLoading(false);
      showAlert && dispatch(openSuccessAlertAction())
      //setSuccessAlert(false);
    })
    .catch(err => {
      console.log('server error');
      setLoading(false);
    })
  }
  const jumpToPage = (pageParams:PageJumper, row:any)=>{
    onAction({name:JUMP_TO_PAGE_ACTION, page:{...pageParams, dataId:row.id}})
  }

  const handleKeywordChange = (keyword:string)=>{
    setKeyword(keyword);
  }

  const handleFilterChange = (values:any)=>{
    setFilterValues(values);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    realtimePage = newPage;
    emitAction(COMMAND_QUERY)
  };

  const handleRequestSort = (newOrders:Array<FieldOrder>) => {
    setOrders(newOrders)
  };

  const handleBatchAction = (commandSlug:string)=>{
    emitAction(commandSlug, true);
  }
  const handleRowAction = (commandSlug:string, rowId:string)=>{
    emitAction(commandSlug, true, rowId);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const hasRowCommands = rowCommands && rowCommands.length > 0;
  

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classNames(classes.root, className)} {...rest} ref={ref}>
      <Paper>
        <ListViewToolbar
          keyword = {keyword}
          numSelected={selected.length}
          filters = {filters}
          batchCommands = {batchCommands}
          filterValues = {filterValues}
          onFilterChange = {handleFilterChange}
          onKeywordChange = {handleKeywordChange}
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
              orders = {orders}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length || 0}
              columns = {columns}
              loading = {loading}
              hasRowCommands = {hasRowCommands}
            />
            <TableBody>
              {rows.map((row:Row, index: any) => {
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
                            id = {row.id}
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
                                          command.jumpToPage ? jumpToPage(command.jumpToPage as PageJumper, row) : handleRowAction(command.slug, row.id);
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
          count={rows.length || 0}
          rowsPerPage={rowsPerPage}
          page={realtimePage||0}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
          }}
        />
      </Paper>
    </div>
  );
})

export default ListView;

