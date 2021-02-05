import { TableRow, TableCell, Checkbox} from "@material-ui/core";
import React from "react";
import { useListViewStore } from "../ListViewStore";
import {observer} from "mobx-react";
import ListViewTableRowActionFilter from "./ListViewTableRowActionFilter";
import { useModelStore } from "Base/ModelTree/ModelProvider";

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

export const ListViewBodyTableRow = observer((
  props: {
    children?:any,
  }
)=>{
  const {children, ...rest} = props;
  const rowModel = useModelStore();
  const listViewStore = useListViewStore();
  
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      {...rest}
    >
      {rowModel&&
      <ListViewTableRowActionFilter row={rowModel}>
        {
          listViewStore.selectable &&
          <TableCell padding="checkbox">
            <RowCheckBox
              rowId={rowModel.value?.id}
            />
          </TableCell>
        }
        {
          children
        }
        </ListViewTableRowActionFilter>
      }
    </TableRow>
  );
})
