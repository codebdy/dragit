import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ITreeNode } from 'base/Model/ITreeNode';
import TreeNode from './TreeNode';
import { RXNode } from 'base/RXNode/RXNode';
import { ID } from 'base/Model/graphqlTypes';

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
    nodes?:Array<RXNode<ITreeNode>>,
    nameKey:string,
    draggedNode?:RXNode<ITreeNode>,
    onNodeDragStart:(node?:RXNode<ITreeNode>)=>void,
    onDragEnd:()=>void,
    onDragIn:(node:RXNode<ITreeNode>)=>void,
    onExchange:(node:RXNode<ITreeNode>)=>void,
    onRemove:(node:RXNode<ITreeNode>)=>void,
    onAddChild:(node:RXNode<ITreeNode>)=>void,
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
        onSelect(nodeId);
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
