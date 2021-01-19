import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { ID } from 'Base/Model/graphqlTypes';
import { useEffect } from 'react';
import { RXModel } from 'Base/ModelTree/RXModel';
import {observer} from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontSize:'0.8rem',
      padding:theme.spacing(0.5,0),
      userSelect:'none',
    },
  }),
);

export const ModelTreeNode = observer((
  props:{
    modelNode: RXModel,
    selected:ID,
    onSelect:(selected:ID)=>void,
  }
)=>{
  const {selected, onSelect, modelNode} = props;
  const classes = useStyles();
  useEffect(()=>{
    modelNode.setSelected(selected === modelNode.node.id)
    return ()=>{
      modelNode.setSelected(false);
    }
  },[selected, modelNode])

  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    if(modelNode.node.id === selected){
      onSelect('');
    }
    else{
      onSelect(modelNode.node.id);      
    }
  }

  return (
    <TreeItem 
      nodeId = {modelNode.node.id} 
      label={
        <div 
          className = {classes.label}
          onClick = {handleClick}
          title = {`value : ${JSON.stringify(modelNode.value)}`}
        >{modelNode.label}</div>
      }
    >
      {
        modelNode.getChildren()?.map(childStore=>{
          return(
            <ModelTreeNode 
              key = {childStore.node.id} 
              selected = {selected}
              modelNode = {childStore} 
              onSelect = {onSelect} 
            />
          )
        })
      }
    </TreeItem>
  )
})
