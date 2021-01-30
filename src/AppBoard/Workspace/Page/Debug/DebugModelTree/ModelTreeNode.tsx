import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { RXModel } from 'Base/ModelTree/RXModel';
import {observer} from 'mobx-react';
import { useDebugStore } from '../DebugStore';

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
  }
)=>{
  const {modelNode} = props;
  const classes = useStyles();

  const debugStore = useDebugStore();

  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    if(modelNode.id === debugStore?.selectedModel?.id){
      debugStore?.setSelectedModel(undefined)
    }
    else{
      debugStore?.setSelectedModel(modelNode)   
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
              modelNode = {childStore} 
            />
          )
        })
      }
    </TreeItem>
  )
})
