import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { ITreeNode } from 'base/Model/ITreeNode';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import { grey } from '@material-ui/core/colors';
import { Add, Delete } from '@material-ui/icons';
import { RXNode } from 'base/RXNode/RXNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacer: {
      flex:1,
    },
    actions:{
      display:'flex',
    },
    itemLabel:{
      padding:theme.spacing(0.5, 0),
      userSelect:'none',
      display:'flex',
      justifyContent:'space-between'
    },
    labelText:{
      padding:theme.spacing(0.5, 0),
    },
    draggedHover:{
      outline: grey[500] + ' dashed 1px',
    },
    dragInTip:{
      outline:grey[500] + ' dashed 1px',
      marginRight:theme.spacing(1),
      padding:theme.spacing(0, 1),
      display:'flex',
      alignItems:'center',
    },
    tipDraggedOver:{
      outline:theme.palette.primary.main + ' solid 1px',
    },
    editActions:{
      display:'flex',
      alignItems:'center',
      marginRight:theme.spacing(1),
    }
  }),
);

export default function TreeNode(
  props:{
    node:RXNode<ITreeNode>,
    nameKey:string,
    draggedNode?:RXNode<ITreeNode>,
    onNodeDragStart:(node?:RXNode<ITreeNode>)=>void,
    onDragEnd:()=>void,
  }
){
  const {node, nameKey, draggedNode, onNodeDragStart, onDragEnd} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
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
    if(draggedNode && draggedNode?.id !== node.id
        && !node.isAncestorOf(draggedNode.id)
        && !node.isPosterityOf(draggedNode.id)
      ){
      event.preventDefault();
      setDraggedOver(true);
      setDragChangedOver(true);      
    }
    else{
      setDragChangedOver(false);
    }
  }

  const handleDragInOver = (event: React.DragEvent<HTMLDivElement>)=>{
    if(draggedNode && draggedNode?.id !== node.id
      && !draggedNode.isAncestorOf(node.id) ){
      event.preventDefault();
      setDraggedOver(true);
      setDragInOver(true);      
    }
    else{
      setDragInOver(false);
    }
  }

  const handleMouseOver = (event: React.MouseEvent<unknown>)=>{
    setHover(true);
  }

  const handleMouseOut = (event: React.MouseEvent<unknown>)=>{
    setHover(false);
  }

  const handleDropChange = (event: React.MouseEvent<unknown>)=>{
    setDraggedOver(false);
    onDragEnd();
    setDragChangedOver(false);
    event.stopPropagation();
  }

  const handleDropIn = (event: React.MouseEvent<unknown>)=>{
    setDraggedOver(false);
    onDragEnd();
    setDragInOver(false);
    event.stopPropagation();
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
          onMouseOver = {handleMouseOver}
          onMouseLeave = {handleMouseOut}
        >
          <div className = {classes.labelText}>{node.meta[nameKey]}</div>
          <div className={classes.actions}>
            {
              hover && !draggedNode &&
              <div className = {classes.editActions}>
                <IconButton size = "small" onClick={(e)=>{
                  e.stopPropagation();
                  //onAddFolder(node);
                }}>
                  <Add fontSize = "small" />
                </IconButton>
                <IconButton size = "small"  onClick={(e)=>{
                  e.stopPropagation();
                  //onRemoveFolder(node);
                }}>
                  <Delete fontSize = "small" />
                </IconButton>
              </div>
            }
            {
              draggedNode &&
              <Fragment>
                <div 
                  className={classNames(classes.dragInTip, {[classes.tipDraggedOver]:dragChangedOver})}
                  onDragOver = {handleDragChangeOver}
                  onDragLeave = {()=>setDragChangedOver(false)}
                  onDrop = {handleDropChange}
                  style={{opacity:draggedOver ? 1 : 0}}
                >
                  {intl.get('drag-to-replace')}
                </div>                
                <div 
                  className={classNames(classes.dragInTip, {[classes.tipDraggedOver]:dragInOver})}
                  onDragOver = {handleDragInOver}
                  onDragLeave = {()=>setDragInOver(false)}
                  onDrop = {handleDropIn}
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
