import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel} from "@material-ui/core";
import React from "react";
import { ListViewMetaItem } from "./ListViewMetaItem";

type Order = 'asc' | 'desc';

export interface ListViewHeadProps {
  numSelected: number;
  onRequestSort: (orders:Array<FieldOrder>) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orders: Array<FieldOrder>;
  rowCount: number;
  columns:Array<ListViewMetaItem>;
}

export interface FieldOrder{
  field:string;
  direction: Order;
}

export function ListViewHead(props: ListViewHeadProps) {
  const { onSelectAllClick, orders, numSelected, rowCount, onRequestSort, columns } = props;

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
          <Checkbox
            id = 'all'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {columns.map((column,index) => (
          <TableCell
            key={column.field + '-' + index}
            sortDirection={getOrderDirection(column.field)}
            {...column.props}
          >
            {column.sortable ?
                column.label
              :
              <TableSortLabel
                id = {column.field}
                active={!!getOrderDirection(column.field)}
                direction={getOrderDirection(column.field)}
                onClick={createSortHandler(column.field)}
              >
                {column.label}
              </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
