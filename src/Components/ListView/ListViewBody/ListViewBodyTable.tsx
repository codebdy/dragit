import { TableBody} from "@material-ui/core";
import React from "react";
import { useListViewStore } from "../ListViewStore";
import {observer} from 'mobx-react';
import { ListViewBodyTableRow } from "./ListViewBodyTableRow";
import { ListViewBodyTableCell } from "./ListViewBodyTableCell";
import { ListViewRowStore } from "../ListViewRowStore";

export const ListViewBodyTable = observer((

) =>{
  const listViewStore = useListViewStore();

  return (
    <TableBody>
      {listViewStore.rows?.map((row:ListViewRowStore) => {
          return (
            <ListViewBodyTableRow key={row.modelStore.model.id} modelStore={row.modelStore}>
              {
                row.columns.map((column) => {
                  return(
                    <ListViewBodyTableCell key={column.id} column = {column} />
                  )
                })
              }
            </ListViewBodyTableRow>
          );
        })}
    </TableBody>
  );
})
