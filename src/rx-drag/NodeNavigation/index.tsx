import * as React from 'react';
import { observer } from 'mobx-react';
import { useRxDragShellStore } from 'rx-drag/store/useRxDragShellStore';
import './style.css';
import classNames from 'classnames';


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
      <div className = 'rx-node-navigation-label'>
        Row
        <div className = 'label-arrow'></div>
      </div>
      <div className =  {classNames('rx-node-navigation-label', 'inter')}>
        Column
        <div className = 'label-arrow'></div>
      </div>
      <div className = {classNames('rx-node-navigation-label', 'checked')}>
        GridItem
        <div className = 'label-arrow'></div>
      </div>
    </div>
  );
})
