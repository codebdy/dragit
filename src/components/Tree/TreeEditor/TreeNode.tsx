import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { ITreeNode } from 'base/Model/ITreeNode';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { green, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacer: {
      flex:1,
    },
    actions:{
      display:'flex',
    },
    itemLabel:{
      padding:theme.spacing(1, 0),
      userSelect:'none',
      display:'flex',
      justifyContent:'space-between'
    },
    draggedHover:{
      outline: grey[500] + ' dashed 1px',
    },
    dragInTip:{
      outline:grey[500] + ' dashed 1px',
      marginLeft:theme.spacing(1),
    },
    tipDraggedOver:{
      outline:theme.palette.primary.main + ' solid 1px',
    },
  }),
);

export default function TreeNode(
  props:{
    node:ITreeNode,
    nameKey:string,
    draggedNode?:ITreeNode,
    onNodeDragStart:(node?:ITreeNode)=>void,
    onDragEnd:()=>void,
  }
){
  const {node, nameKey, draggedNode, onNodeDragStart, onDragEnd} = props;
  const classes = useStyles();
  const [draggedOver, setDraggedOver] = useState(false);
  const [dragChangedOver, setDragChangedOver] = useState(false);
  const [dragInOver, setDragInOver] = useState(false);

  const handleDragStart = ()=>{
    onNodeDragStart(node);
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>)=>{
    if(draggedNode?.id !== node.id){
      //event.preventDefault();
      setDraggedOver(true);      
    }
  }

  const handleDragChangeOver = (event: React.DragEvent<HTMLDivElement>)=>{
    if(draggedNode?.id !== node.id){
      event.preventDefault();
      setDraggedOver(true);
      setDragChangedOver(true);      
    }
  }

  const handleDragInOver = (event: React.DragEvent<HTMLDivElement>)=>{
    if(draggedNode?.id !== node.id){
      event.preventDefault();
      setDraggedOver(true);
      setDragInOver(true);      
    }
  }

  const handleDropOnLabel =(event: React.DragEvent<HTMLDivElement>)=>{
    event.stopPropagation();
    event.preventDefault();
    setDraggedOver(false);
  }

  return (
    <TreeItem 
      nodeId = {node.id.toString()}
      label={
        <div 
          className={classNames(classes.itemLabel, {[classes.draggedHover]:draggedOver}) } 
          draggable = {true}
          onDragStart = {handleDragStart}
          onDragOver = {handleDragOver}
          onDragLeave = {()=>setDraggedOver(false)}
          onDragEnd = {onDragEnd}
          onDrop = {handleDropOnLabel}
        >
          {node[nameKey]}
          <div className={classes.actions}>
            {
              draggedNode &&
              <Fragment>
                <div 
                  className={classNames(classes.dragInTip, {[classes.tipDraggedOver]:dragChangedOver})}
                  onDragOver = {handleDragChangeOver}
                  onDragLeave = {()=>setDragChangedOver(false)}
                  style={{opacity:draggedOver ? 1 : 0}}
                >
                  {intl.get('drag-to-replace')}
                </div>                
                <div 
                  className={classNames(classes.dragInTip, {[classes.tipDraggedOver]:dragInOver})}
                  onDragOver = {handleDragInOver}
                  onDragLeave = {()=>setDragInOver(false)}
                  style={{opacity:draggedOver ? 1 : 0}}
                >
                  {intl.get('drag-to-sub-node')}
                </div>                
              </Fragment>

            }
          </div>
          
        </div> 
      }
      onLabelClick = {e=>e.preventDefault()}
    >
      {
        node.children?.map(child=>{
          return (
            <TreeNode 
              key={child.id} 
              node= {child} 
              nameKey = {nameKey}
              draggedNode = {draggedNode}
              onNodeDragStart = {onNodeDragStart}
              onDragEnd = {onDragEnd} 
            />
          )
        })
      }
    </TreeItem>
  )
}
