import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { IModelNode } from 'Base/ModelTree/IModelNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontSize:'0.8rem',
      padding:theme.spacing(0.5,0),
    },
  }),
);

export default function ModelTreeNode(
  props:{
    modelNode: IModelNode,
  }
){
  const {modelNode} = props;
  const classes = useStyles();

  return (
    <TreeItem 
      nodeId = {modelNode.id} 
      label={
        <div className = {classes.label}>{modelNode.getLabel()}</div>
      }
    >
      {
        modelNode.getChildren()?.map(childStore=>{
          return(
            <ModelTreeNode key = {childStore.id} modelNode = {childStore} />
          )
        })
      }
    </TreeItem>
  )
}
