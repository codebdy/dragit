import { TableCell, TableBody} from "@material-ui/core";
import React, { useEffect } from "react";
import { RXNode } from "Base/RXNode/RXNode";
import { IMeta } from "Base/Model/IMeta";
import { useListViewStore } from "../ListViewStore";
import {observer} from 'mobx-react';
import { Skeleton } from "@material-ui/lab";
import ComponentRender from "Base/ComponentRender";
import { ListViewBodyTableRow, DataRow } from "./ListViewBodyTableRow";

export const ListViewBodyTable = observer((
  props: {
    columns:Array<RXNode<IMeta>>
  }
) =>{
  const {columns} = props;
  const listViewStore = useListViewStore();
  useEffect(()=>{
    listViewStore.setColumns(columns);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <TableBody>
      {listViewStore.rows?.map((row:DataRow, index: any) => {
          return (
            <ListViewBodyTableRow key={row.id} row={row}>
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
            </ListViewBodyTableRow>
          );
        })}
    </TableBody>
  );
})
