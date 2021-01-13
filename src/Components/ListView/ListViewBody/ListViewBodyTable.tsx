import { TableBody} from "@material-ui/core";
import React, { useEffect } from "react";
import { RXNode } from "Base/RXNode/RXNode";
import { IMeta } from "Base/Model/IMeta";
import { useListViewStore } from "../ListViewStore";
import {observer} from 'mobx-react';
import { ListViewBodyTableRow, DataRow } from "./ListViewBodyTableRow";
import { ListViewBodyTableCell } from "./ListViewBodyTableCell";

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
                    <ListViewBodyTableCell key={row.id + '-' + column.id} column = {column} row={row} />
                  )
                })
              }
            </ListViewBodyTableRow>
          );
        })}
    </TableBody>
  );
})
