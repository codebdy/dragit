import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import DrawerItemList from './DrawerItemList';
import { ToolsAccordion } from './ToolsAccordion';
import IMenuItem from 'Base/Model/IMenuItem';
import { RxNode } from 'rx-drag/models/RxNode';
import { NodeEditor } from './NodeEditor';
import { ID } from 'rx-drag/models/baseTypes';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'100%',
      height:'100%',
      display:'flex',
      flexFlow:'column',
      background: theme.palette.background.default,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: theme.palette.text.primary,
    },
    content:{
      //flex:1,
      height:'100%',
      display:'flex',
      padding:theme.spacing(2),
    },
    left:{
      flex:'1',
      paddingRight:theme.spacing(3),
      marginTop:theme.spacing(2),
    },
    center:{
      width:'360px',
      border:'solid 2px rgba(0,0,0, 0.3)',
      backgroundColor: theme.palette.background.paper,
      display:'flex',
      flexFlow:'column', 
    },
    right:{
      flex:'1',
      paddingLeft:theme.spacing(5),
    },
  }),
);

export const RxNavigationEditor = observer(()=>{
  const classes = useStyles();
  const [rootNode,setRootNode] = React.useState(new RxNode<IMenuItem>());
  const [selectedNode, setSelectedNode] = useState<RxNode<IMenuItem>>();
  const [draggedNode, setDraggedNode] =  useState<RxNode<IMenuItem>>();
  const studioStore = useAppStudioStore();
 
  useEffect(()=>{
    rootNode.parse(cloneObject(studioStore?.rxApp?.navigationItems||[]));
    setRootNode(rootNode.copy());
    studioStore?.editNavigation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[studioStore?.rxApp?.navigationItems]);


  const handleSelectedNode = (node:RxNode<IMenuItem>)=>{
    setSelectedNode(node);
  }

  const doChange = (items:Array<IMenuItem>)=>{
    studioStore?.navigationEditor?.setCurrentData(items);
  }

  const handleMetaChange = (node:RxNode<IMenuItem>, field:string, value:any)=>{
    let copy = rootNode.copy()
    let targetNode = copy.getNode(node.id);
    targetNode?.meta && (targetNode.meta[field] = value);
    setRootNode(copy);
    setSelectedNode(targetNode);
    doChange(copy.getChildrenMetas());
  }

  const handleStartDragNode = (node:RxNode<IMenuItem>)=>{
    setDraggedNode(node);
  }

  const handleDragEnd = ()=>{
    setDraggedNode(undefined);
  }

  const doDrag = (funciontName :string, targetId:ID)=>{
    if(!draggedNode){
      return;
    }

    let copy = rootNode.copy()
    let targetNode = copy.getNode(targetId);
    if(!targetNode){
      return;
    }

    let node = copy.getNode(draggedNode.id) || draggedNode;
    let nodeAny = node as any;
    nodeAny[funciontName](targetNode);      
    setRootNode(copy);   
    doChange(copy.getChildrenMetas()) 
  }

  const handleDragToBefore = (targetId:ID)=>{
    doDrag('moveBefore', targetId);
  }

  const handleDragToAfter = (targetId:ID)=>{
    doDrag('moveAfter', targetId);
  }

  const handleDragIn = (targetId:ID)=>{
    doDrag('moveIn', targetId);
  }

  const handleOverTopDragOver = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();
  }

  const handleOverTopDop = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();
    if(!draggedNode){
      return;
    }
    let copy = rootNode.copy();
    let node = copy.getNode(draggedNode.id);
    node?.remove();
    if(draggedNode.id === selectedNode?.id){
      setSelectedNode(undefined);
    }
    setRootNode(copy); 
    doChange(copy.getChildrenMetas())
  }

  const handleDragOver = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();
    event.stopPropagation();
    if(!draggedNode || rootNode.children.length > 0){
      return;
    }
    let copy = rootNode.copy();
    draggedNode?.moveIn(copy);
    setRootNode(copy);     
  }

  return (
    <div className={classes.root}>
      <Container className={classes.content} onDragOver={handleOverTopDragOver} onDrop={handleOverTopDop}>
        <div className = {classes.left}>
          {selectedNode && <NodeEditor node = {selectedNode} onChange = {handleMetaChange} />}
        </div>
        <div className = {classes.center}
          onDrop = {(event: React.DragEvent<unknown>)=>{event.stopPropagation()}}
          onDragOver = {handleDragOver}
        >
          <DrawerItemList 
            nodes={rootNode.children} 
            draggedNode = {draggedNode}
            onSelected = {handleSelectedNode}
            onDragToBefore = {handleDragToBefore}
            onDragToAfter = {handleDragToAfter}
            onDragStart = {handleStartDragNode}
            onDragEnd = {handleDragEnd}
            onDragIn = {handleDragIn}
          />
        </div>
        <div className = {classes.right}>
          <ToolsAccordion onStartDragNode={handleStartDragNode} onEndDragNode = {handleDragEnd}/>
        </div>
      </Container>
    </div>
  ) 
})
