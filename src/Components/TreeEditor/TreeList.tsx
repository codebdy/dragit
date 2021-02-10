import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ITreeNode } from 'Base/Model/ITreeNode';
import TreeNode from './TreeNode';
import { RxNode } from 'rx-drag/models/RxNode';
import { ID } from 'rx-drag/models/baseTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding:theme.spacing(2),
    },
  }),
);


export default function TreeList(
  props:{
    nodes?:Array<RxNode<ITreeNode>>,
    nameKey:string,
    draggedNode?:RxNode<ITreeNode>,
    onNodeDragStart:(node?:RxNode<ITreeNode>)=>void,
    onDragEnd:()=>void,
    onDragIn:(node:RxNode<ITreeNode>)=>void,
    onExchange:(node:RxNode<ITreeNode>)=>void,
    onRemove:(node:RxNode<ITreeNode>)=>void,
    onAddChild:(node:RxNode<ITreeNode>)=>void,
    onSelect:(nodeId:ID)=>void,
  }
) {
  const {nodes, nameKey, draggedNode, onNodeDragStart, onDragEnd, onDragIn, onExchange, onRemove, onAddChild, onSelect} = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect = {(e: any, nodeId: string) =>{
        onSelect(parseInt(nodeId));
      }} 
    >
      {
        nodes?.map(node=>{
          return(
            <TreeNode 
              key={node.id} 
              node={node} 
              nameKey = {nameKey}
              draggedNode = {draggedNode}
              onNodeDragStart = {onNodeDragStart}
              onDragEnd = {onDragEnd}
              onDragIn = {onDragIn}
              onExchange = {onExchange}
              onRemove = {onRemove}
              onAddChild = {onAddChild}
            ></TreeNode>
          )
        })
      }
    </TreeView>
  );
}
