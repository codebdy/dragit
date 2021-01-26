import * as React from 'react';
import { observer } from 'mobx-react';
import { useRxDragStore } from 'rx-drag/context/useRxDragStore';


export const NodeNavigation = observer(() => {
  const store = useRxDragStore();
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
