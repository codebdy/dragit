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
import { PageActionHandle } from 'admin/views/Page/PageAction';
import axios from 'axios';

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

  const rows = paginate.data;

  const [keyword, setKeyword] = React.useState('');
  const [filterValues, setFilterValues] = React.useState({});
  const [orders, setOrders] = React.useState<Array<FieldOrder>>([])
  const [selected, setSelected] = React.useState<string[]>([]);
  //const [rows, setRows] = React.useState<Array<Row>>([]);
  //const rows: any[] = value&& value.data? value.data : [];
  let realtimePage = page;

  useEffect(() => {
    console.log('ListView useEffect')
    emitAction(COMMAND_QUERY);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[keyword, filterValues, orders]);

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

  const emitAction = (command:string, rowID?:string)=>{
    console.log('ListView提交数据：',command, keyword)
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
    })
    .catch(err => {
      console.log('server error');
    });

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
    emitAction(commandSlug)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pageRows = parseInt(event.target.value, 10)
    console.log('handleChangeRowsPerPage', pageRows) 
    setRowsPerPage(pageRows);
    //setPage(0);
  };

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
                        <Checkbox
                          id = {row.id}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {
                        columns.map((column, colIndex) => {
                          return(
                            <TableCell key={row.id + '-' + colIndex + '-' + column.field} {... column.props} 
                            dangerouslySetInnerHTML={{__html: row[column.field]}} >
                            </TableCell>
                          )
                        })
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

