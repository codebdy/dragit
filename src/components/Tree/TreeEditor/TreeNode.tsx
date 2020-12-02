import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { ITreeNode } from 'base/Model/ITreeNode';
import TreeListLabel from './TreeNodeLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacer: {
      flex:1,
    },
  }),
);

export default function TreeNode(
  props:{
    node:ITreeNode,
    nameKey:string,
  }
){
  const {node, nameKey} = props;
  const classes = useStyles();
  return (
    <TreeItem 
      nodeId = {node.id.toString()}
      label={
        <TreeListLabel>{node[nameKey]}</TreeListLabel> 
      }
    >
      {
        node.children?.map(child=>{
          return (
            <TreeNode key={child.id} node= {child} nameKey = {nameKey} />
          )
        })
      }
    </TreeItem>
  )
}
