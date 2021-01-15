import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { IModelNode } from 'Base/ModelTree/IModelNode';
import { ID } from 'Base/Model/graphqlTypes';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontSize:'0.8rem',
      padding:theme.spacing(0.5,0),
      userSelect:'none',
    },
  }),
);

export default function ModelTreeNode(
  props:{
    modelNode: IModelNode,
    selected:ID,
    onSelect:(selected:ID)=>void,
  }
){
  const {selected, onSelect, modelNode} = props;
  const classes = useStyles();
  useEffect(()=>{
    modelNode.setSelected(selected === modelNode.id)
    return ()=>{
      modelNode.setSelected(false);
    }
  },[selected, modelNode])

  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    if(modelNode.id === selected){
      onSelect('');
    }
    else{
      onSelect(modelNode.id);      
    }
  }

  return (
    <TreeItem 
      nodeId = {modelNode.id} 
      label={
        <div 
          className = {classes.label}
          onClick = {handleClick}
        >{modelNode.getLabel()}</div>
      }
    >
      {
        modelNode.getChildren()?.map(childStore=>{
          return(
            <ModelTreeNode 
              key = {childStore.id} 
              selected = {selected}
              modelNode = {childStore} 
              onSelect = {onSelect} 
            />
          )
        })
      }
    </TreeItem>
  )
}
