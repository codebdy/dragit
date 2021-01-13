import { TableCell } from "@material-ui/core";
import React, { Fragment } from "react";
import { RXNode } from "Base/RXNode/RXNode";
import { IMeta } from "Base/Model/IMeta";
import { useListViewStore } from "../ListViewStore";
import {observer} from 'mobx-react';
import { Skeleton } from "@material-ui/lab";
import ComponentRender from "Base/ComponentRender";
import { DataRow } from "./ListViewBodyTableRow";

export const ListViewBodyTableCell = observer((
  props: {
    column:RXNode<IMeta>,
    row:DataRow
  }
) =>{
  const {column, row} = props;
  const listViewStore = useListViewStore();
  return (
    <Fragment>
      {   
        listViewStore.isLoading(row.id, column.meta.props?.field) 
        ? <TableCell >
            <Skeleton animation="wave" height={50} width="50%" />
          </TableCell>
        : <ComponentRender component = {column} />
      }
    </Fragment>
  );
})
