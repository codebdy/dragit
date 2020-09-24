import React from 'react';
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
import { Data, ListViewHead } from './ListViewHead';
import ListViewToolbar from './ListViewToolbar';
import { ListViewMetaItem } from './ListViewMetaItem';
import intl from 'react-intl-universal';

/*function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];*/
//const rows: any[] = [];

type Order = 'asc' | 'desc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },

  }),
);

const ListView = React.forwardRef((
    props: {
      className:string, 
      value?:any, 
      columns:Array<ListViewMetaItem>, 
      filters:Array<ListViewMetaItem>,
      batchActions:Array<ListViewMetaItem>,
      rowActions:Array<ListViewMetaItem>,
      rowsPerPageOptions:string,
      defalutRowsPerPage:number 
    }, ref:any)=>{

  const {className, value, columns, filters, rowActions, batchActions, rowsPerPageOptions = "10,25,50", defalutRowsPerPage = 10, ...rest} = props
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const rows: any[] = value? value : [];
  //const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(defalutRowsPerPage);

  const parseRowsPerPageOptions = ()=>{
    let ret: number[] = [];
    rowsPerPageOptions?.replace('，',',').split(',').forEach(i=>{
      ret.push(parseInt(i));
    })
    return ret;
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      //const newSelecteds = rows.map((n) => n.name);
      //setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setDense(event.target.checked);
  //};

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classNames(classes.root,className )} {...rest} ref={ref}>
      <Paper>
        <ListViewToolbar 
          numSelected={selected.length}
          filters = {filters}
          batchActions = {batchActions}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <ListViewHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns = {columns}
            />
            <TableBody>
              {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `listview-${index}`;
                  return (
                    <TableRow
                      hover
                      id={row.id}
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={parseRowsPerPageOptions()}
          component="div"
          labelRowsPerPage = {intl.get('rows-per-page') + ':'}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            //native: true,
            id:'pagination',
          }}
        />
      </Paper>
    </div>
  );
})

export default ListView;

