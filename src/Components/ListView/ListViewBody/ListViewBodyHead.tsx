import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel} from "@material-ui/core";
import React from "react";
import { RXNode } from "Base/RXNode/RXNode";
import { IMeta } from "Base/Model/IMeta";
import { useListViewStore } from "../ListViewStore";
import {Observer} from 'mobx-react';

export function ListViewBodyHead(
  props: {
    columns:Array<RXNode<IMeta>>
  }
) {
  const {columns} = props;
  const listViewStore = useListViewStore();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if (event.target.checked) {
      const newSelecteds = listViewStore.rows.map((n) => n.id);
      listViewStore.setSelects(newSelecteds);
    }
    else{
      listViewStore.setSelects([]);
    }
  }
  
  return (
    <Observer>
      {()=>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                id = 'all'
                indeterminate={listViewStore.selects.length > 0 && listViewStore.selects.length < listViewStore.rows.length}
                checked={listViewStore.rows.length > 0 && listViewStore.selects.length === listViewStore.rows.length}
                onChange={handleSelectAll}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            {columns.map((column,index) => {
              const{sortable, ...restProps} = column.meta.props as any;
              return(
                <TableCell
                  key={column.id + '-' + index}
                  sortDirection={listViewStore.getFieldDirection(column.meta.props?.field)}
                  {...restProps}
                >
                  {column.meta.props?.sortable ?
                    <TableSortLabel
                      id = {column.id + 'label'}
                      active={!!listViewStore.getFieldDirection(column.meta.props?.field)}
                      direction={listViewStore.getFieldDirection(column.meta.props?.field)}
                      onClick={()=>listViewStore.sortField(column.meta.props?.field)}
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
      }
    </Observer>
  );
}
