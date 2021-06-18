import { Divider, Grid, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { ID } from 'rx-drag/models/baseTypes';
import { ITreeNode } from 'Base/Model/ITreeNode';
import { RxNode } from 'rx-drag/models/RxNode';
import SubmitButton from 'Components/common/SubmitButton';
import Portlet from 'Components/Portlet';
import React, { useEffect, useState } from 'react';
import intl from "react-intl-universal";
import TreeList from './TreeList';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { useQueryGQL } from './useQueryGQL';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useDesign } from 'rx-drag/store/useDesign';
import { useModelStore } from 'Base/ModelTree/ModelProvider';
import {observer} from 'mobx-react';
import { useMutationGQL } from './useMutationGQL';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useMagicQuery } from 'Data/useMagicQuery';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';
import useLayzyMagicPost from 'Data/useLayzyMagicPost';


const TreeEditor =observer((
  props:{
    title:string,
    elevation:number,
    nameKey:string,
    children:any,
    query?:string,
    mutation?:string,
  }
)=>{
  const {nameKey = 'name', query, mutation, children, ...rest} = props;
  const modelStore = useModelStore();
  const queryGQL = useQueryGQL(query);
  const mutationGQL = useMutationGQL(mutation);
  const [draggedNode, setDraggedNode] = useState<RxNode<ITreeNode>|undefined>();
  const [root, setRoot] = useState<RxNode<ITreeNode>>();
  const [selectedNode, setSelectedNode] = useState<RxNode<ITreeNode>|undefined>();
  const appStore  = useDragItStore();

  const {isDesigning} = useDesign();
  const {loading, data, error} = useMagicQuery(new MagicQueryBuilder());
  const [excuteSave, {loading:saving, error:saveError}] = useLayzyMagicPost({
    onCompleted(){
      appStore.setSuccessAlert(true);
    }
  });

  useShowServerError(error || saveError);

  useEffect(()=>{
    if(query){
      let root = new RxNode<ITreeNode>(); 
      root.parse(cloneObject((data)||[]));
      setRoot(root);   
    }
  },[data, query]);

  useEffect(()=>{
    if(modelStore?.isDirty()){
      storeSelectedNode();
      modelStore?.clearDirty();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore?.isDirty()])

  const handleNodeDragStart = (node?:RxNode<ITreeNode>)=>{
    setDraggedNode(node);
  }

  //form值改变刷新树列表
  const valueChanged = ()=>{
    let newRoot = new RxNode<ITreeNode>();
    newRoot.children = [...(root?.children||[])];
    setRoot(newRoot);
  }

  const handleDragIn = (node:RxNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let draggedNodeCopy = rootCopy?.getNode(draggedNode?.id);
    let nodeCopy = rootCopy?.getNode(node.id);
    if(nodeCopy){
      draggedNodeCopy?.moveIn(nodeCopy);      
    }
    setRoot(rootCopy);
  }

  const handleExchange = (node:RxNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let draggedNodeCopy = rootCopy?.getNode(draggedNode?.id);
    let nodeCopy = rootCopy?.getNode(node.id);
    if(nodeCopy){
      draggedNodeCopy?.exchangeTo(nodeCopy);      
    }
    setRoot(rootCopy);
  }

  const handleRootDragOver = (event: React.MouseEvent<unknown>)=>{
    if(draggedNode){
      event.preventDefault();
    }
  }

  const handelRootDrop =  (event: React.MouseEvent<unknown>)=>{
    if(draggedNode){
      let rootCopy = root?.copy();
      let draggedNodeCopy = rootCopy?.getNode(draggedNode?.id);
      if(draggedNodeCopy && rootCopy){
        draggedNodeCopy.moveIn(rootCopy);
        setRoot(rootCopy);        
      }
      event.preventDefault();
    }
  }

  const handelRemove = (node:RxNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let nodeCopy = rootCopy?.getNode(node.id);
    nodeCopy?.remove();
    setRoot(rootCopy); 
  }

  const handleAddChild = (node:RxNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let nodeCopy = rootCopy?.getNode(node.id);
    if(!nodeCopy){
      return;
    }
    
    let newNode = RxNode.make<ITreeNode>({
      [nameKey]:'New Node',
    })
    newNode.moveIn(nodeCopy);    
    setRoot(rootCopy); 
  }

  const handleAddRootChild = ()=>{
    let rootCopy = root?.copy();

    if(!rootCopy){
      return;
    }

    let newNode = RxNode.make<ITreeNode>({
      [nameKey]:'New Node',
    })
    newNode.moveIn(rootCopy);    
    setRoot(rootCopy); 
  }

  const storeSelectedNode = ()=>{
    selectedNode?.setMeta({...modelStore?.toInputValue(), id:selectedNode?.meta?.id});
    valueChanged();
  }

  const handleSelect = (nodeId:ID)=>{
    let node = root?.getNode(nodeId);
    setSelectedNode(node);
    modelStore?.setValue(node?.getMeta());
  }

  const handleSave = ()=>{
    excuteSave({data:{tree:root?.getChildrenMetas()}})
  }

  return (
    <Portlet 
      withHeader={true} 
      {...rest}
      actions = {
        <SubmitButton 
          variant = "contained" 
          color = "primary" 
          size = "large" 
          submitting = {saving}
          onClick = {handleSave}
        >{intl.get("save")}</SubmitButton>
      }
    >
      <Grid container>
        <Grid container item xs={5}>
          <Grid item container xs={true} direction="column"
            onDragOver = {handleRootDragOver}
            onDrop = {handelRootDrop}
          >
            <Grid item>
              {
                loading?
                (new Array(4).fill('')).map((item,index)=>{
                  return(
                    <ListItem 
                      button
                      key={index} 
                    >
                      <ListItemText>
                        <Skeleton animation="wave" variant="rect" width={'60%'} height={30} />
                      </ListItemText>
                    </ListItem>
                  )
                })
                :
                <TreeList 
                  nodes={root?.children} 
                  nameKey = {nameKey}
                  draggedNode = {draggedNode}
                  onNodeDragStart = {handleNodeDragStart}
                  onDragEnd = {()=>setDraggedNode(undefined)}
                  onDragIn = {handleDragIn}
                  onExchange = {handleExchange}
                  onRemove = {handelRemove}
                  onAddChild = {handleAddChild}
                  onSelect = {handleSelect}
                />              
              }

            </Grid>
            
            <Grid item container justify = "center" alignContent = "center" direction = "column" xs = {true}>
              <IconButton onClick = {handleAddRootChild}>
                <Add />
              </IconButton>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />  

        </Grid>
        <Grid item xs={7}>
          {(selectedNode || isDesigning)&& children}
        </Grid>
      </Grid>
    </Portlet>

  )
})


export default TreeEditor;
