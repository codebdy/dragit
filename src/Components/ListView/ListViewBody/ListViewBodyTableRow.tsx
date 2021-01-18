import { TableRow, TableCell, Checkbox} from "@material-ui/core";
import React from "react";
import { useListViewStore } from "../ListViewStore";
import { ModelProvider } from "Base/ModelTree/ModelProvider";
import { ModelStore } from "Base/ModelTree/ModelStore";
import {observer} from "mobx-react";
import ListViewTableRowActionFilter from "./ListViewTableRowActionFilter";

const RowCheckBox = observer((props:{rowId:string}) => {
  const {rowId} = props;
  const listViewStore = useListViewStore();
  const isItemSelected = listViewStore.isRowSelected(rowId);
  const labelId = `listview-${rowId}`;
  const handleClick = ()=>{
    listViewStore.toggleSelect(rowId);
  }
  return (
    <Checkbox
      checked={isItemSelected}
      inputProps={{ 'aria-labelledby': labelId }}
      onClick = {handleClick}
    />
  )
})

export const ListViewBodyTableRow = (
  props: {
    modelStore:ModelStore,
    children?:any,
  }
)=>{
  const {modelStore: row, children} = props;

  return (
    <ListViewTableRowActionFilter row={row}>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.model.id}
      >
        <TableCell padding="checkbox">
          {
            <RowCheckBox
              rowId={row.model.id}
            />
          }
        </TableCell>
        <ModelProvider value={row}>
          {
            children
          }
        </ModelProvider>
      </TableRow>
    </ListViewTableRowActionFilter>
  );
}
