import * as React from 'react';
import { observer } from 'mobx-react';
import { useRxDragShellStore } from 'rx-drag/context/useRxDragShellStore';


export const NodeNavigation = observer(() => {
  const store = useRxDragShellStore();
  return (
    <div className = 'rx-node-navigation'
      style = {
        {
          borderColor:store?.themeOptions.borderColor,
        }
      }
    >
      rx-node-navigation
    </div>
  );
})
