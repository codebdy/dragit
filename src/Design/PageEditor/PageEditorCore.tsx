import React, { Fragment, useEffect } from 'react';
import intl from 'react-intl-universal';
import MouseFollower from './Core/MouseFollower';
import { IMeta } from 'Base/RXNode/IMeta';
import { ComponentView } from './Core/ComponentView';
import { RxNode } from 'rx-drag/RxNode';
import { NodeToolbar } from './Core/NodeToolbar';
import { DragCusor } from './Core/DragCusor';
import { ComponentLabel } from './Core/ComponentLabel';
import { cloneObject } from '../../rx-drag/utils/cloneObject';
import { observer } from 'mobx-react';
import { PageEditorStore } from './PageEditorStore';
import { RemoveCommand } from './Commands/RemoveCommand';
import { DuplicateCommand } from './Commands/DuplicateCommand';

export const PageEditorCore = observer((
  props:{
    editorStore:PageEditorStore,
  }
) =>{
  const {editorStore} = props;

  const handleMouseUp = ()=>{
    if(editorStore.dragOverParam && (editorStore.draggedToolboxItem || editorStore.draggedNode)){
      let targetNode = editorStore.dragOverParam?.targetNode;
      let dragNode = editorStore.draggedNode;
      if(!dragNode && editorStore.draggedToolboxItem?.meta){
        dragNode = RxNode.make<IMeta>(cloneObject(editorStore.draggedToolboxItem?.meta));
      }
      if(dragNode && targetNode) {
        editorStore?.operateNode(dragNode, targetNode, editorStore.dragOverParam.position);
      }
    }
    editorStore.setDragOverParam(undefined);
    editorStore.setDraggedNode(undefined);
    editorStore.setDraggedToolboxItem(undefined);
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
    editorStore.setDraggedNode(editorStore.selectedNode);
    editorStore.setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected')
  }

  const handleRemove = ()=>{
    if(editorStore.selectedNode){
      editorStore.excuteCommand(new RemoveCommand(editorStore.selectedNode))
    }
  }

  const handleDupliate = ()=>{
    if(editorStore.selectedNode){
      editorStore.excuteCommand(new DuplicateCommand(editorStore.selectedNode))
    }
  }

  const handleSelectParent = ()=>{
    editorStore.setSelectedNode(editorStore.selectedNode?.parent);
  }

  let draggedLabel = editorStore.draggedToolboxItem ?editorStore.draggedToolboxItem?.title || intl.get(editorStore.draggedToolboxItem?.titleKey||'') : editorStore.draggedNode?.meta.name;
   return (
    <Fragment>
      {editorStore.canvas&&
        <ComponentView 
          node ={editorStore.canvas}
        />
      }
      {
        editorStore.activeNode &&
        <ComponentLabel 
          node={editorStore.activeNode}
          followDom = {editorStore.activeNode.dom}
        />
      }              
      {
        editorStore.selectedNode &&
        <Fragment>
          <ComponentLabel 
            node={editorStore.selectedNode}
            followDom = {editorStore.selectedDom}
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
          (editorStore.draggedToolboxItem || editorStore.draggedNode) &&
          <MouseFollower label={ draggedLabel || 'unknow'} />
        }
        {
          (editorStore.draggedToolboxItem || editorStore.draggedNode) &&
          <DragCusor/>
        }
      </Fragment>  
    </Fragment>
  );
})