import * as React from 'react';
import { observer } from 'mobx-react';
import { useRxDragShellStore } from 'rx-drag/store/useRxDragShellStore';
import './style.css';
import { NodeNavigationLabel } from './NodeNavigationLabel';
import { useEffect, useRef } from 'react';


export const NodeNavigation = observer(() => {
  const shellStore = useRxDragShellStore();
  const elRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const dom = elRef?.current;
    if(dom){
      dom.scrollLeft = dom.clientWidth;
    }
  })
  
  return (
    <div className = 'rx-node-navigation'
      ref = {elRef}
      style = {
        {
          borderColor:shellStore?.themeOptions.borderColor,
        }
      }
    >
        <NodeNavigationLabel>
          div
        </NodeNavigationLabel>
        <NodeNavigationLabel className = 'inter'>
          Column
        </NodeNavigationLabel>
        <NodeNavigationLabel className = 'checked'>
          GridItem
        </NodeNavigationLabel>
    </div>
  );
})
