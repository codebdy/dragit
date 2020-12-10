import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { FieldOrder } from "base/Model/IOperateListParam";
import React from "react";
import { ListViewMetaItem } from "./ListViewMetaItem";
import intl from "react-intl-universal";


export interface ListViewHeadProps {
  numSelected: number;
  onRequestSort: (orders:Array<FieldOrder>) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orders?: Array<FieldOrder>;
  rowCount: number;
  columns:Array<ListViewMetaItem>;
  loading:boolean;
  rowCommandsCount:number;
}

export function ListViewHead(props: ListViewHeadProps) {
  const { onSelectAllClick, orders = [], numSelected, rowCount, onRequestSort, columns, loading, rowCommandsCount} = props;

  const createSortHandler = (field: string) => (event: React.MouseEvent<unknown>) => {
    let order = getOrder(field);
    if(order){
      if(order.direction === 'asc'){
        order.direction = 'desc';
        onRequestSort([...orders])
      }else if(order.direction === 'desc'){
        removeOrder(order.field)
      }
    }else{
      onRequestSort([...orders, {field:field, direction:'asc'}]);
    }
  };

  const removeOrder = (field:string)=>{
    for(var i = 0; i < orders.length; i++){
      if(field === orders[i].field){
        orders.splice(i,1);
        onRequestSort([...orders])
        return
      }
    }    
  }

  const getOrderDirection = (field:string)=>{
    return getOrder(field)?.direction;
  }

  const getOrder = (field:string)=>{
    for(var i = 0; i < orders.length; i++){
      if(field === orders[i].field){
        return orders[i]
      }
    }
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {
             loading ? 
              <Skeleton animation="wave" height={50} width="60%" />
             :
            <Checkbox
              id = 'all'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          }
        </TableCell>
        {columns.map((column,index) => (
          loading ? 
          <TableCell key={column.field + '-' + index} {... column.props} >
            <Skeleton animation="wave" height={50} width="50%" />
          </TableCell>
          :
          <TableCell
            key={column.field + '-' + index}
            sortDirection={getOrderDirection(column.field)}
            {...column.props}
          >
            {column.sortable ?
              <TableSortLabel
                id = {column.field}
                active={!!getOrderDirection(column.field)}
                direction={getOrderDirection(column.field)}
                onClick={createSortHandler(column.field)}
              >
                {column.label}
              </TableSortLabel>
              :
              column.label
            }
          </TableCell>
        ))}
        {
          rowCommandsCount > 0 &&
          (
            loading ? 
            <TableCell  align="right">
              <Skeleton animation="wave" height={50} width="50%" />
            </TableCell>
            :
            <TableCell align="center" style={{width:(40 * rowCommandsCount)+"px"}}>{intl.get('operations')}</TableCell>
          )
        }
      </TableRow>
    </TableHead>
  );
}
