import React, { Fragment, useEffect } from 'react';
import intl from 'react-intl-universal';
import MouseFollower from './MouseFollower';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/RxNode';
import { NodeToolbar } from './NodeToolbar';
import { DragCusor } from './DragCusor';
import { ComponentLabel } from './ComponentLabel';
import { cloneObject } from '../utils/cloneObject';
import { observer } from 'mobx-react';
import { RxDragStore } from '../store/RxDragStore';
import { RemoveCommand } from '../commands/RemoveCommand';
import { DuplicateCommand } from '../commands/DuplicateCommand';
import { ComponentView } from './ComponentView';

export const RxDragCore = observer((
  props:{
    rxDragStore:RxDragStore,
  }
) =>{
  const {rxDragStore} = props;

  const handleMouseUp = ()=>{
    if(rxDragStore.dragOverParam && (rxDragStore.draggedToolboxItem || rxDragStore.draggedNode)){
      let targetNode = rxDragStore.dragOverParam?.targetNode;
      let dragNode = rxDragStore.draggedNode;
      if(!dragNode && rxDragStore.draggedToolboxItem?.meta){
        dragNode = RxNode.make<IMeta>(cloneObject(rxDragStore.draggedToolboxItem?.meta));
      }
      if(dragNode && targetNode) {
        rxDragStore?.operateNode(dragNode, targetNode, rxDragStore.dragOverParam.position);
      }
    }
    rxDragStore.setDragOverParam(undefined);
    rxDragStore.setDraggedNode(undefined);
    rxDragStore.setDraggedToolboxItem(undefined);
    document.body.classList.remove('can-not-be-selected');
  }

  useEffect(()=>{
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  
  const handleBeginDrag = ()=>{
    rxDragStore.setDraggedNode(rxDragStore.selectedNode);
    rxDragStore.setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected')
  }

  const handleRemove = ()=>{
    if(rxDragStore.selectedNode){
      rxDragStore.excuteCommand(new RemoveCommand(rxDragStore.selectedNode))
    }
  }

  const handleDupliate = ()=>{
    if(rxDragStore.selectedNode){
      rxDragStore.excuteCommand(new DuplicateCommand(rxDragStore.selectedNode))
    }
  }

  const handleSelectParent = ()=>{
    rxDragStore.setSelectedNode(rxDragStore.selectedNode?.parent);
  }

  let draggedLabel = rxDragStore.draggedToolboxItem ?rxDragStore.draggedToolboxItem?.title || intl.get(rxDragStore.draggedToolboxItem?.titleKey||'') : rxDragStore.draggedNode?.meta.name;
   return (
    <Fragment>
      {rxDragStore.canvas&&
        <ComponentView 
          node ={rxDragStore.canvas}
        />
      }
      {
        rxDragStore.activeNode &&
        <ComponentLabel 
          node={rxDragStore.activeNode}
          followDom = {rxDragStore.activeNode.dom}
        />
      }              
      {
        rxDragStore.selectedNode &&
        <Fragment>
          <ComponentLabel 
            node={rxDragStore.selectedNode}
            followDom = {rxDragStore.selectedDom}
          />
          <NodeToolbar 
            onBeginDrag = {handleBeginDrag}
            onRemove = {handleRemove}
            onSelectParent = {handleSelectParent}
            onDuplicate = {handleDupliate}
          />
        </Fragment>
      }
      <Fragment>
        {
          (rxDragStore.draggedToolboxItem || rxDragStore.draggedNode) &&
          <MouseFollower label={ draggedLabel || 'unknow'} />
        }
        {
          (rxDragStore.draggedToolboxItem || rxDragStore.draggedNode) &&
          <DragCusor/>
        }
      </Fragment>  
    </Fragment>
  );
})