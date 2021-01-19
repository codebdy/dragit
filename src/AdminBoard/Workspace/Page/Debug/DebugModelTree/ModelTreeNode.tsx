import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
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
    selected?:RXModel,
    onSelect:(selected?:RXModel)=>void,
  }
)=>{
  const {selected, onSelect, modelNode} = props;
  const classes = useStyles();
  useEffect(()=>{
    modelNode.setSelected(selected?.id === modelNode.node.id)
    return ()=>{
      modelNode.setSelected(false);
    }
  },[selected, modelNode])

  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    if(modelNode.id === selected?.id){
      onSelect(undefined);
    }
    else{
      onSelect(modelNode);      
    }
  }

  return (
    <TreeItem 
      nodeId = {modelNode.id} 
      label={
        <div 
          className = {classes.label}
          onClick = {handleClick}
          title = {`${modelNode.node.rxid}, value : ${JSON.stringify(modelNode.toInputValue())}`}
        >{modelNode.label}</div>
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
})
