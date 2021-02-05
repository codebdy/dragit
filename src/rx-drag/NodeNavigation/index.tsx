import * as React from 'react';
import { observer } from 'mobx-react';
import { useRxDragShellStore } from 'rx-drag/store/useRxDragShellStore';
import { NodeNavigationLabel } from './NodeNavigationLabel';
import { useEffect, useRef, useState } from 'react';
import { useRxDragStore } from 'rx-drag/store/useDesign';
import { IRxMeta } from 'rx-drag/models/IRxMeta';
import { RxNode } from 'rx-drag/models/RxNode';
import './style.css';

export const NodeNavigation = observer(() => {
  const shellStore = useRxDragShellStore();
  const [labels, setLabels] = useState<Array<{node:RxNode<IRxMeta>, className?:string}>>([]);
  const elRef = useRef<HTMLDivElement>(null);
  const rxDragStore = useRxDragStore();
  const creatNavLabels = ()=>{
    var newLabels:Array<{node:RxNode<IRxMeta>, className?:string}> = [];
    var node = rxDragStore?.selectedNode;
    var interNode:RxNode<IRxMeta>|undefined = undefined;
    while(node && node?.id !== rxDragStore?.canvas?.id){
      if(node.id === rxDragStore?.selectedNode?.id){
        newLabels.unshift({node, className:'checked'})
        interNode = node.parent;
      }
      else if(interNode?.id === node.id){
        newLabels.unshift({node, className:'inter'})
      }
      else{
        newLabels.unshift({node})
      }
      node = node.parent;
    }
    setLabels(newLabels);
  }

  useEffect(()=>{
    creatNavLabels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rxDragStore?.selectedNode])

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
          borderColor: shellStore?.themeOptions.borderColor,
        }
      }
    >
      {
        labels.map((label, index)=>{
          return(
            <NodeNavigationLabel 
              key = {index} className = {label.className}
              onClick = {()=>{rxDragStore?.setSelectedNode(label.node)}}
            >
              {label.node?.meta?.name}
            </NodeNavigationLabel>
          )
        })
      }
    </div>
  );
})
