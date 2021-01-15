import { TableCell } from "@material-ui/core";
import React, { Fragment } from "react";
import { RXNode } from "Base/RXNode/RXNode";
import { IMeta } from "Base/Model/IMeta";
import { useListViewStore } from "../ListViewStore";
import {observer} from 'mobx-react';
import { Skeleton } from "@material-ui/lab";
import { ComponentRender } from "Base/PageUtlis/ComponentRender";

export const ListViewBodyTableCell = observer((
  props: {
    column:RXNode<IMeta>
  }
) =>{
  const {column} = props;
  const listViewStore = useListViewStore();
  return (
    <Fragment>
      {   
        listViewStore.loading 
        ? <TableCell>
            <Skeleton animation="wave" height={50} width="50%" />
          </TableCell>
        : <ComponentRender component = {column} />
      }
    </Fragment>
  );
})
