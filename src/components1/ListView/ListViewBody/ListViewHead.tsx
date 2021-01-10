import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { FieldOrder } from "components1/ListView/IQueryParam";
import React from "react";
import { RXNode } from "base1/RXNode/RXNode";
import { IMeta } from "base1/Model/IMeta";


export interface ListViewHeadProps {
  numSelected: number;
  onRequestSort: (orders:Array<FieldOrder>) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orders?: Array<FieldOrder>;
  rowCount: number;
  columns:Array<RXNode<IMeta>>;
  loading?:boolean;
}

export function ListViewHead(props: ListViewHeadProps) {
  const { onSelectAllClick, orders = [], numSelected, rowCount, onRequestSort, columns, loading} = props;

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
        {columns.map((column,index) => {
          const{sortable, ...restProps} = column.meta.props as any;
          return(
            loading ? 
            <TableCell key={column.id + '-' + index} {... restProps} >
              <Skeleton animation="wave" height={50} width="50%" />
            </TableCell>
            :
            <TableCell
              key={column.id + '-' + index}
              sortDirection={getOrderDirection(column.meta.props?.field)}
              {...restProps}
            >
              {column.meta.props?.sortable ?
                <TableSortLabel
                  id = {column.id + 'label'}
                  active={!!getOrderDirection(column.meta.props?.field)}
                  direction={getOrderDirection(column.meta.props?.field)}
                  onClick={createSortHandler(column.meta.props?.field)}
                >
                  {column.meta.props?.label}
                </TableSortLabel>
                :
                column.meta.props?.label
              }
            </TableCell>
          )
        })
        }
      </TableRow>
    </TableHead>
  );
}
