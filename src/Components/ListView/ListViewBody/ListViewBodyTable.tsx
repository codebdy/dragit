import { TableRow, TableCell, Checkbox, TableBody} from "@material-ui/core";
import React from "react";
import { RXNode } from "Base/RXNode/RXNode";
import { IMeta } from "Base/Model/IMeta";
import { useListViewStore } from "../ListViewStore";
import {Observer} from 'mobx-react';
import { Skeleton } from "@material-ui/lab";
import ComponentRender from "Base/ComponentRender";
import { ModelProvider } from "Base/ModelTree/ModelProvider";
import { ModelStore } from "Base/ModelTree/ModelStore";

export interface Row{
  id:any,
  [key:string]:any,
}

export function ListViewBodyTable(
  props: {
    columns:Array<RXNode<IMeta>>
  }
) {
  const {columns} = props;
  const listViewStore = useListViewStore();

  return (
    <Observer>
      {()=>
        <TableBody>
          {listViewStore.rows?.map((row:Row, index: any) => {
              const isItemSelected = listViewStore.isRowSelected(row.id);
              const labelId = `listview-${index}`;
              return (
                <TableRow
                  hover
                  id={row.id}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  onClick = {event=>listViewStore.toggleSelect(row.id)}
                >
                  <TableCell padding="checkbox">
                    {
                      <Checkbox
                        id = {row.id.toString()}
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={event=>listViewStore.toggleSelect(row.id)}
                      />
                    }
                  </TableCell>
                  <ModelProvider value={new ModelStore(row)}>
                    {
                      columns?.map((column, colIndex) => {
                        return(
                          listViewStore.loading ? 
                          <TableCell key={row.id + '-' + colIndex} >
                            <Skeleton animation="wave" height={50} width="50%" />
                          </TableCell>
                          :
                          <ComponentRender key={colIndex} component = {column} />
                        )
                      })
                    }
                  </ModelProvider>
                </TableRow>
              );
            })}
        </TableBody>
    }
    </Observer>
  );
}
