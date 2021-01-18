import { TableBody} from "@material-ui/core";
import React from "react";
import { useListViewStore } from "../ListViewStore";
import {observer} from 'mobx-react';
import { RXModel } from "Base/ModelTree/RXModel";
import { ModelProvider } from "Base/ModelTree/ModelProvider";
import { ComponentRender } from "Base/PageUtils/ComponentRender";

export const ListViewBodyTable = observer((

) =>{
  const listViewStore = useListViewStore();

  const rows = listViewStore?.rxModel?.getChildren() || [];
  return (
    <TableBody>
      {rows?.map((row:RXModel) => {
          return (
            <ModelProvider value={row} key={row.node.id}>
              <ComponentRender node={row.node} />
            </ModelProvider>
          );
        })}
    </TableBody>
  );
})
