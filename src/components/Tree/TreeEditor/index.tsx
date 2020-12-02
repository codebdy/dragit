import { Divider, Grid, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';
import { useAxios } from 'base/Hooks/useAxios';
import { ITreeNode } from 'base/Model/ITreeNode';
import { RXNodeRoot } from 'base/RXNode/Root';
import { RXNode } from 'base/RXNode/RXNode';
import SubmitButton from 'components/common/SubmitButton';
import Portlet from 'components/Portlet';
import React, { useEffect, useState } from 'react';
import intl from "react-intl-universal";
import TreeList from './TreeList';


const TreeEditor = React.forwardRef((
  props:{
    title:string,
    elevation:number,
    apiForGet:AxiosRequestConfig,
    apiForSave:AxiosRequestConfig,
    nameKey:string,
    children:any,
  }, 
  ref:any
)=>{
  const {apiForGet, apiForSave, nameKey = 'name', children, ...rest} = props;

  const [itemsGot, loading] = useAxios<Array<ITreeNode>>(apiForGet);
  const [configForSave, setConfigForSave] = useState<AxiosRequestConfig>();
  const [itemsJustSaved, saving] = useAxios<Array<ITreeNode>>(configForSave);
  const [draggedNode, setDraggedNode] = useState<RXNode<ITreeNode>|undefined>();
  const [root, setRoot] = useState<RXNodeRoot<ITreeNode>>();

  useEffect(()=>{
    const items = itemsJustSaved ? itemsJustSaved : itemsGot;
    let root = new RXNodeRoot<ITreeNode>(); 
    root.parse(items);
    setRoot(root);
  },[itemsJustSaved, itemsGot]);

  const handleNodeDragStart = (node?:RXNode<ITreeNode>)=>{
    setDraggedNode(node);
  }

  const handleDragIn = (node:RXNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let draggedNodeCopy = rootCopy?.getNode(draggedNode?.id);
    let nodeCopy = rootCopy?.getNode(node.id);
    if(nodeCopy){
      draggedNodeCopy?.moveIn(nodeCopy);      
    }
    setRoot(rootCopy);
  }

  const handleExchange = (node:RXNode<ITreeNode>)=>{
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

  const handelRemove = (node:RXNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let nodeCopy = rootCopy?.getNode(node.id);
    nodeCopy?.removeFormParent();
    setRoot(rootCopy); 
  }

  const handleAddChild = (node:RXNode<ITreeNode>)=>{
    let rootCopy = root?.copy();
    let nodeCopy = rootCopy?.getNode(node.id);
    if(!nodeCopy){
      return;
    }
    
    let newNode = RXNode.make<ITreeNode>({
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

    let newNode = RXNode.make<ITreeNode>({
      [nameKey]:'New Node',
    })
    newNode.moveIn(rootCopy);    
    setRoot(rootCopy); 
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
          {children}
        </Grid>
      </Grid>
    </Portlet>

  )
})


export default withSkeleton(TreeEditor);
